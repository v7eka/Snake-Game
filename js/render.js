function Render(grid, unit, ctx){
	this.ctx = ctx;
	this.unit = unit;
	this.grid = grid;
}

Render.prototype.update = function(){
	this.clearScreen();
	
	this.grid.renderLoop(this.objectRender.bind(this));
}

Render.prototype.clearScreen = function(){
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Render.prototype.graphRender = function(x1, y1, x2, y2){
	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.moveTo(x1, y1);
	this.ctx.lineTo(x2, y2);
	this.ctx.stroke();
	this.ctx.restore();	
}

Render.prototype.objectRender = function(id, vector){
	this.ctx.save();
	switch(id){
		case 'wall':
			this.ctx.fillStyle = 'black';
			this.ctx.fillRect(vector.y*this.unit, vector.x*this.unit, this.unit, this.unit);
			break;

		case 'snakeScale': 
			this.ctx.fillStyle = 'gray';
			this.ctx.fillRect(vector.y*this.unit, vector.x*this.unit, this.unit, this.unit);
			break;

		case 'apple': 
			this.ctx.fillStyle = 'green';
			this.ctx.fillRect(vector.y*this.unit, vector.x*this.unit, this.unit, this.unit);
			break;

		case 'bigApple': 
			this.ctx.fillStyle = 'red';
			this.ctx.fillRect(vector.y*this.unit, vector.x*this.unit, this.unit, this.unit);
			break;

		case 'poison':
			this.ctx.fillStyle = 'blue';
			this.ctx.fillRect(vector.y*this.unit, vector.x*this.unit, this.unit, this.unit);
			break;

			
		default		: console.log("render prob");		
	}
	this.ctx.restore();
}

Render.prototype.gameOver = function(){
	this.ctx.save();
	ctx.font = "48px serif";
	ctx.fillText("Game", 100, 100);
	ctx.fillText("Over ||", 100, 150);
	this.ctx.restore();	
}

Render.prototype.gameWin = function(){
	this.ctx.save();
	ctx.font = "48px serif";
	ctx.fillText("Game", 100, 100);
	ctx.fillText(" Win ||", 100, 150);
	this.ctx.restore();	
}

Render.prototype.pause = function(){
	this.ctx.save();
	ctx.font = "48px serif";
	ctx.fillText("|| Pause",100, 100);
	this.ctx.restore();	
}

Render.prototype.scoore = function(scoore){
	this.ctx.save();
	ctx.font = "14px serif";
	ctx.fillText('Scoore : ' + scoore,300, 30);
	this.ctx.restore();	
}

Render.prototype.instruction = function(){
	ctx.save();

	ctx.font = "20px serif";
	ctx.fillText("Instructions ||or|| [press ENTER to play]", 10, 30);
	
	ctx.font = "14px serif";
	//snake
	this.objectRender('snakeScale', new Vector(3,1));
	this.objectRender('snakeScale', new Vector(3,2));
	this.objectRender('snakeScale', new Vector(3,3));
	ctx.fillText(": It is snake, it move, eat and grow (or shrink) ", 66, 60);
	
	ctx.fillText("Snake Snacks :: ==>> ", 10, 90);
	//bigApple
	this.objectRender('bigApple', new Vector(7,1));
	ctx.fillText(": Best food ~ points worth 4 ~ snake grow", 66, 120);
	
	//apple
	this.objectRender('apple', new Vector(9,1));
	ctx.fillText(": Good food ~ points worth 2 ~ snake grow", 66, 150);
	
	//poison
	this.objectRender('poison', new Vector(11,1));
	ctx.fillText(": Worst food ~ points worth -2 ~ snake shrink", 66, 180);
	
	this.objectRender('snakeScale', new Vector(13,1));
	ctx.fillText(": Snake itself ~ points worth -1 ~ snake shrink", 66, 210);
	
	//Game Over Conditiom
	ctx.fillText("Game Over :: If -> hit Boundary OR Snake Length is one ", 10, 240);
	
	//Game Win
	ctx.fillText("Game Win :: If -> Snake is HUGEST!!! ", 10, 270);
	
	//control
	ctx.font = "20px serif";
	ctx.fillText("--------- Controls ------------ ", 10, 300);
	
	ctx.font = "14px serif";
	ctx.fillText(" press SPACE key to [pause] game ", 10, 330);
	ctx.fillText(" press LEFT key to [move left] ", 10, 360);
	ctx.fillText(" press RIGHT key to [move right] ", 10, 380.9);
	ctx.fillText(" press DOWN key to [move down] ", 10, 400.9);
	ctx.fillText(" press UP key to [move up] ", 10, 420.9);
	
	ctx.fillText("|| Press ENTER to [play] game ||", 220, 440);
	ctx.restore();
}
