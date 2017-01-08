function Control(grid, state, scoore){
	var self = this;
	
	this.state = state;
	
	this.directions = {
		'up': new Vector(-1, 0),
		'down': new Vector(1, 0),
		'left': new Vector(0, -1),
		'right': new Vector(0, 1) 
	};
	
	this.direc = 'right';
	
	this.keyboard = window.onkeydown = function(e){
		if (e.keyCode == '38') { self.setDirec('up');}
		else if (e.keyCode == '40') { self.setDirec('down');}
		else if (e.keyCode == '37') { self.setDirec('left');}
		else if (e.keyCode == '39') { self.setDirec('right');}
	}
	this.setDirec = function(value){ this.direc = value; };
	this.getDirec = function(){ return(this.direc); };

	this.grid = grid;

	this.scoore = scoore;
}

Control.prototype.update = function(){
	//move snake
	this.state.snake.move(this.directions[this.direc], this.grid, this.state);
	////////////////////////////////
	// ALTER GAME SCORE ON BASIS OF MOVEMENT
	///////////////////////////////////
	if(!this.state.apple){
		//console.log("no apple in game");
		//get free spot from grid
		//set apple in spot
	}
	
	//set timer use increemet concept
	if(!this.state.bigApple){
		//console.log("no big-apple in game");
		//get free spot from grid
		//set apple in spot
	}
	if(!this.state.poison){
		//console.log("no poison in game");
		//get free spot from grid
		//set apple in spot
	}
}
