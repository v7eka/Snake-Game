function attribute(unit, borderSize){
	return { unit : unit||30 ,borderSize : borderSize||900 };
}
function object(type, eatable, energy, move){
	this.type = type; 
	this.eatable = eatable;
	this.energy = energy;
	this.move = move;
}
function Apple(){
	object.call(this, 'apple', true, 2, false);
}
function Poison(){
	object.call(this, 'poison', false, -2, false);
}
function Wall(){
	object.call(this, 'wall', false, 0, false);
}
function Snake(){
	object.call(this, 'snake', false, 0, true);
	this.speed= 10;
	this.scales = new Array(); //3 by default
	this.heart= 3;
	this.queue = {front : -1, rear : -1};
}
Snake.prototype.digestSys = function(objType, game, vector){ 
	/*alter points*/
	if(objType == 'snake' || objType == 'wall'){
		//deduce point and heart accordingly
	}else{
		//apple
		for(var food in game.foods){ if(objType == food){ game.foods[food] = undefined;
			game.grid.set(undefined, vector); /*ater point and add 2 point*/
			console.log('been here');
		}};
		//poison
		for(var toxin in game.toxins){ if(objType == toxin){ game.toxins[toxin] = undefined;
			game.grid.set(undefined, vector); /*alter point and reduce 2 point accordingly*/
		}};
	}
	return food;	
};
Snake.prototype.eat = function(game, vector){
	var food = game.grid.get(vector);
	console.log(food);
	return food ? this.digestSys(food, game, vector) : false;
};
Snake.prototype.moveAhead = function(game, direction){
	//animate THE snake
	var aheadVector = this.scales[this.scales.length -1].plus(game.direction[direction]);
	/*//WALL
	if(!game.grid.isInside(aheadVector)){
		console.log('in');
		game.render.gameOver();
		clearInterval(game.interval);
		return;
	}*/
	if(objType = this.eat(game, aheadVector)){
		this.walk(game, objType, aheadVector);
	}else{
		this.walk(game, 'vacant', aheadVector);
	}
};
Snake.prototype.walk = function(game, ahead, vector){
	if(ahead == 'vacant'){
		this.enqueue(vector);
		this.dequeue(1);
		return;
	}
	if(ahead == 'snake'){console.log('snake for god shake'); return;}
	if(ahead == 'wall'){return;}
	for(var food in game.foods){ if(ahead == food){return;}};
	for(var toxin in game.toxins){ if(ahead == toxin){return;}};
};
//console.log((new Snake).digestSys(new Poison()));
Snake.prototype.setScale = function(vector){
	this.scales.push(vector);
};
Snake.prototype.enqueue = function(vector){
	if(this.scales.length == 0){ this.queue.front ++;}
	for(i = 0; i < arguments.length; i ++){
		this.setScale(arguments[i]);
		this.queue.rear ++;
	}
	//console.table(this.scales);
};
Snake.prototype.dequeue = function(numOfItem){
	/*delete the item if {poision: delete 2, apple: 0, vacant: 1} */
	while(numOfItem){
		//shifting
		for(var i = 0; i < this.queue.rear; i++){ this.scales[i] = this.scales[i+1];}
		this.queue.rear --;	this.scales.length --;
		numOfItem --;
	}
	if(this.scales.length == 0){ this.queue.front = -1;};
};
Snake.prototype.init = function(){
	this.enqueue(new Vector(0, 0), new Vector(1, 0), new Vector(2, 0));
};

function Vector(x, y) {
	this.unit = attribute().unit;
	this.x = x*this.unit; this.y = y*this.unit;
}
Vector.prototype.plus = function(other) {
	return new Vector((this.x + other.x)/this.unit, (this.y + other.y)/this.unit);
};

function Grid(size, unit){
	this.size = size;
	this.unit = unit;
	this.space = new Array((this.size*this.size)/(this.unit*this.unit));
	console.log(this.space);
}
Grid.prototype.isInside = function(vector) {
	console.log(vector)
	return vector.x >= 0 && vector.x < this.size/2 && 
		vector.y >= 0 && vector.y < this.size/2;
};
Grid.prototype.get = function(vector){//extrct obj else null
	var objType = this.space[vector.x + this.size*vector.y];
	return objType ? objType : null; 
}
Grid.prototype.set = function(objType, vector){
	this.space[vector.x + this.size*vector.y] = objType;
}

function Event(){
	var self = this;
	this.dir = 'right';
	window.onkeydown = function(e){
		if (e.keyCode == '38') { self.setDir('up');}
		else if (e.keyCode == '40') { self.setDir('down');}
		else if (e.keyCode == '37') { self.setDir('left');}
		else if (e.keyCode == '39') { self.setDir('right');}
	}
}
Event.prototype.setDir = function(value){ this.dir = value; };
Event.prototype.getDir = function(){ return(this.dir); };

function Render(ctx, unit, grid){
	this.ctx = ctx;
	this.unit = unit;
	this.grid = grid;
}
Render.prototype.update = function(game){
	this.clearScreen();
	game.render.snake(game.snake.scales);
}
Render.prototype.clearScreen = function(){
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}
Render.prototype.gameOver = function(){
	this.clearScreen();
	this.ctx.save();
	this.ctx.font = "48px serif";
	this.ctx.fillText("Game Over", 10, 50);
	this.ctx.restore()
}
Render.prototype.snake = function(scales){
	this.ctx.save();
	this.ctx.fillStyle = 'red';
	for(var i = 0; i < scales.length; i ++){
		this.ctx.fillRect(scales[i].x, scales[i].y, this.unit, this.unit);	
	}
	this.ctx.restore();
};
Render.prototype.apple = function(vector){
	this.ctx.save();
	this.ctx.fillStyle = 'red';
	this.ctx.fillRect(vector.x, vector.y, unit, unit);
	this.ctx.restore();
};
Render.prototype.poison = function(vector){
	this.ctx.save();
	this.ctx.fillStyle = 'blue';
	this.ctx.fillRect(vector.x, vector.y, unit, unit);
	this.ctx.restore();
};

function Game(direction, ctx, unit, size){
	this.direction = direction;
	this.grid = new Grid(size, unit);
	this.event = new Event();
	this.render = new Render(ctx, unit, this.grid);
	
	this.snake = new Snake();
	this.foods = {'apple': undefined};
	this.toxins = {'poison': undefined};
	
	// init the game
	// update the game
	// prototype for draw snake;
	// prototype for move snake
	// prototype for random put apple-
	// prototype for after some interval put poison at random vacant place	
}
Game.prototype.init = function(){
	this.snake.init();
	
	var self = this;
	this.snake.scales.forEach(function(scale){self.grid.set(self.snake.type, scale)});
	this.render.snake(this.snake.scales);
	
	//game on focus
	this.interval = setInterval(function(){self.update()}, 1000);
	
	//---- ----this.render.update
};
Game.prototype.update = function(){
	/*catch the event then
	pause page
	sound page
	or animate game
	*/
	//---------
	/*	a. snake move ahead. step on something checks if it is food. if yes: proceed accordingly
		b. if grid has no apple generate one
		c. appear poison after 2 min 
	*/
	//---- move the snake to right
	this.snake.moveAhead(this, this.event.getDir());
	this.render.update(this);
};

function run(){
	var canvas = document.getElementById('game');
	if(!(ctx = canvas.getContext('2d'))) return;		
	
	var unit = attribute().unit, borderSize = attribute().borderSize /*30px X 30px*/;
	var points= (3*20)+(3*2); //point = heart+scales
	canvas.width = borderSize/2;
	canvas.height = borderSize/2;
	
	var direction = {	'up': new Vector(0, -1),
						'down': new Vector(0, 1),
						'left': new Vector(-1, 0),
						'right': new Vector(1, 0) };
	
	var game = new Game(direction, ctx, unit, borderSize);
	game.init();
	
	var control;
}
window.onload = run;
