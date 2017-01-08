function Render(grid, unit, ctx){
	this.ctx = ctx;
	this.unit = unit;
	this.grid = grid;
}

///////////////////////////////////////
//GAME START; GAME PAUSE			// 
/////////////////////////////////////

Render.prototype.update = function(){
	this.clearScreen();
	
	this.grid.renderLoop(this.objectRender.bind(this));
}

Render.prototype.clearScreen = function(){
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Render.prototype.objectRender = function(id, vector){
	this.ctx.save();
	switch(id){
		case 'snake': 
			this.ctx.fillStyle = 'gray';
			this.ctx.fillRect(vector.y*this.unit, vector.x*this.unit, this.unit, this.unit);
			break;

		case 'apple': 
			this.ctx.fillStyle = 'crimson';
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
