function Control(grid, state, scoore){
	var self = this;
	
	this.state = state;
	
	this.timer = {	
					initPoison: 100,
					initBigApple: 50,
					
					poison : 100,
					bigApple : 50
					}	

	this.directions = {
		'up': new Vector(-1, 0),
		'down': new Vector(1, 0),
		'left': new Vector(0, -1),
		'right': new Vector(0, 1) 
	};
	
	this.look = 'right';
	
	this.keyboard = window.addEventListener("keydown", function(e){
		if (e.keyCode == '38') { self.setLook('up');}
		else if (e.keyCode == '40') { self.setLook('down');}
		else if (e.keyCode == '37') { self.setLook('left');}
		else if (e.keyCode == '39') { self.setLook('right');}
	}, false);
	this.setLook = function(value){ this.look = value; };
	this.getLook = function(){ return(this.look); };

	this.grid = grid;

	this.scoore = scoore;
}

Control.prototype.update = function(){

	var point = this.state.snake.move(this.directions[this.look], this.grid, this.state);
	
	if(!this.state.apple){
		this.state.apple = new Apple(this.grid.freeSpot());
		this.grid.set(this.state.apple);
	}
	
	if(!this.state.bigApple){
		if(this.timer.bigApple == 0){
			this.timer.bigApple = this.timer.initBigApple;
			this.state.bigApple = new BigApple(this.grid.freeSpot());
			this.grid.set(this.state.bigApple);
		}
		this.timer.bigApple --;
	}
	if(!this.state.poison){
		if(this.timer.poison == 0){
			this.timer.poison = this.timer.initPoison;
			this.state.poison = new Poison(this.grid.freeSpot());
			this.grid.set(this.state.poison);
		}
		this.timer.poison --;
	}
	
	if(point){
		this.scoore.alterPointLength(point);
	}
	
	return this.getGameState();
}

Control.prototype.getGameState = function(){
	var state = 'running';
	if(this.state.food.id == "wall" || this.state.snake.scales.length == 1){
		state = 'over';
	}else if(this.grid.space.length == this.grid.size - 2){
		state = 'win'
	}
	return state;
}
