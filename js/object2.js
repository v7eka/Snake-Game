function object(point, id, vector){
	this.point = point;
	this.id = id; 
	this.vector = vector;
	
	this.getPoint = function(){
		return this.point;
	}
}

function Apple(vector){
	object.call(this, 1, 'apple', vector);
}

function BigApple(vector){
	object.call(this, 2, 'big-apple', vector);
}

function Poison(vector){
	object.call(this, -2, 'poison', vector);
}

function snakeScale(vector){
	object.call(this, -1, 'snake-scale', vector);
}

function Wall(vector){
	object.call(this, -1, 'wall', vector);
}

function Snake(){
	
	this.scales = [new snakeScale(new Vector(0, 0)), new snakeScale(new Vector(0, 1)), new snakeScale(new Vector(0, 2))]; //snake length has vector
	
	this.head = this.scales[this.scales.length -1];
	this.tail = this.scales[0];
}

Snake.prototype.move = function(look, grid, state){
	
	
	/*
	var nextMove = this.head.add(look)
	
	if(food = this.checkCollision(nextMove, grid)){
		//detected collision
		var point = this.digest(food, state, grid);
		console.log(food);
		////////////////////////////////////////////////////////////
		//this.scales.push(food.vector);
		//this.grid.set(grid.set(self.state.snake.id, food.vector));
		///////////////////////////////////////////////////////////
		//enqueue and dequeue
	}
	//enqueue and dequeue
	//console.log(state);
	//console.log(grid);
	
	//return point;
	*/
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
