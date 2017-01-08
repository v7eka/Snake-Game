function Game(size, unit, ctx, clock){
	//state has object(s)
	this.state = {
		'snake': new Snake(),
		'wall': new Wall(),
		'apple': false,
		'bigApple': false,
		'poison': false
	};
	
	this.scoore = new Scoore();
	
	this.clock = clock;
	this.grid = new Grid(size, unit);
	
	this.control = new Control(this.grid, this.state, this.scoore);	
	this.render = new Render(this.grid, unit, ctx);

}

Game.prototype.init = function(){
	//set grid (snake only)
	var self = this;
	
	/*///////////////////////////
	
	REFORM INSERTION INTO GRID OF OBJECT METHOD
	
	///////////////////////////*/
	this.state.snake.scales.forEach(function(scale){
		console.log(scale);
		self.grid.set(self.state.snake.id, scale)
	});
	self.grid.set("apple", new Vector(0, 3));
	
	/////////////////////////////////
	// SET WALL IN GRID
	///////////////////////////////////
}

Game.prototype.start = function(){
	this.init();
	
	console.log(this);	
	var self = this;	
	this.interval = setInterval(function(){self.update()}, this.clock);
}

Game.prototype.update = function(){
	this.control.update();
	this.render.update();
	
	//this.score.update();
}

Game.prototype.pause = function(){
	//pause the this.interval
}

function Scoore(){
	// storage
}
