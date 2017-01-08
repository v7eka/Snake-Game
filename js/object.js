function object(point, id, type){
	this.point = point;
	this.id = id; 
	this.type = type;
	
	this.getPoint = function(){
		return this.point;
	}
}

function Apple(){
	object.call(this, 1, 'apple', 'object');
}

function BigApple(){
	object.call(this, 2, 'big-apple', 'object');
}

function Poison(){
	object.call(this, -2, 'poison', 'object');
}

function Wall(){
	object.call(this, -1, 'wall', 'object');
}

function Snake(){
	object.call(this, -1, 'snake', 'object');
	this.scales = [new Vector(0, 0), new Vector(0, 1), new Vector(0, 2)]; //snake length has vector
	this.head = this.scales[this.scales.length -1];
	this.tail = this.scales[0];
}

Snake.prototype.move = function(look, grid, state){
	var nextMove = this.head.add(look) /*snake head + add look*/
	
	if(food = this.checkCollision(nextMove, grid)){
		//detected collision
		var point = this.digest(food, state, grid);
		console.log(food);
		/*
		////////////////////////////////////////////////////////////
		this.scales.push(food.vector);
		this.grid.set(grid.set(self.state.snake.id, food.vector));
		///////////////////////////////////////////////////////////
		*/
		//enqueue and dequeue
	}
	//enqueue and dequeue
	//console.log(state);
	//console.log(grid);
	return point;
}

Snake.prototype.checkCollision = function(nextMove, grid){
	//if object digest point
	return (object = grid.get(nextMove)) ? object : false;
}

Snake.prototype.digest = function(food, state, grid){
	//return point	
	grid.remove(food.vector);
	
	//alter game score
}

Snake.prototype.addScales = function(vector){
	//enqueue
};

Snake.prototype.removeScales = function(numOfItem){
	//dequeue
};
