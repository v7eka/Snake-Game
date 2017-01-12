function Game(size, unit, ctx, clock){
	var self = this;
	
	//state has object(s)	
	this.state = {
		//fixed entity
		'snake': new Snake(),
		'boundry': new Boundry(),
		
		//variable entity
		'apple': false,
		'bigApple': false,
		'poison': false,
		
		//last eaten food
		'food': false
	};
	
	this.scoore = new Scoore();
	
	this.clock = clock;
	
	this.grid = new Grid(size);
	
	this.control = new Control(this.grid, this.state, this.scoore);	
	this.render = new Render(this.grid, unit, ctx);
	
	this.pauseState = false;
	this. keyboard = window.addEventListener("keydown", function(e){
		if (e.keyCode == '32') { self.pauseState = (!self.pauseState); self.pause(self.pauseState);}
	}, false);
	
	
	///////////////////
	// DO IT !!
	//this.music
	//////////////////
}

Game.prototype.init = function(){
	var self = this;

	this.state.snake.scales.forEach(function(scale){
		self.grid.set(scale);
	});
	
	this.state.boundry.walls.forEach(function(wall){
		self.grid.set(wall);
	});
	
	this.render.instruction();
}

Game.prototype.run = function(){
	this.render.update();
	
	var self = this;	
	this.interval = setInterval(function(){self.update()}, this.clock);
}

Game.prototype.update = function(){
	var state = this.control.update();
	this.render.update();
	this.render.scoore(this.scoore.getTotalScoore());
	
	if(state == 'over'){
		this.over();		
	}else if(state == 'win'){
		this.win();
	}
}

Game.prototype.pause = function(state){
	var self = this;
	
	if(state){
		clearInterval(this.interval);
	}else{
		this.interval = setInterval(function(){self.update()}, this.clock);
	}
	this.render.pause();
}

Game.prototype.over = function(){
	clearInterval(this.interval);
	this.render.gameOver();
}

Game.prototype.win = function(){
	clearInterval(this.interval);
	this.render.gameWin();
}
