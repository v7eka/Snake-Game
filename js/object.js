function object(point, id, vector){
	this.point = point;
	this.id = id; 
	this.vector = vector;
}

function Wall(vector){
	object.call(this, 0, 'wall', vector);
}

function Apple(vector){
	this.point = 1;
	this.id = 'apple'; 
	this.vector = vector;
}

function BigApple(vector){
	this.point = 2;
	this.id = 'bigApple'; 
	this.vector = vector;
}

function Poison(vector){
	this.point = -2;
	this.id = 'poison'; 
	this.vector = vector;
}

function SnakeScale(vector){
	this.point = -1;
	this.id = 'snakeScale'; 
	this.vector = vector;
}

function Snake(){
	this.scales = [new SnakeScale(new Vector(1, 1)), new SnakeScale(new Vector(1, 2)), new SnakeScale(new Vector(1, 3))];
	
	this.head = this.scales[this.scales.length -1];
	this.tail = this.scales[0];
	
}

Snake.prototype.move = function(lookVector, grid, state){
	var nextMoveVector = this.head.vector.add(lookVector); 
	
	if(food = this.checkCollision(nextMoveVector, grid)){
		//detected collision
		var point = food.point;
		nextMoveVector = this.digest(food, state, grid, lookVector);
	}
	this.walk(nextMoveVector, grid);
	return point;
};

Snake.prototype.walk = function(nextMoveVector, grid){
	/////////////////////////////////////////////
	// improve walking
	////////////////////////////////////////////
	this.addScales(nextMoveVector, grid);
	this.removeScales(grid);
}

Snake.prototype.addScales = function(vector, grid){
	var newHead = new SnakeScale(vector);

	this.scales.push(newHead);
	this.head = newHead;
	
	grid.set(newHead);
};

Snake.prototype.removeScales = function(grid){
	var newTail = this.scales[1];
	
	grid.remove(this.tail.vector);
	
	this.tail = newTail;
	this.scales.shift();
};
Snake.prototype.checkCollision = function(nextMoveVector, grid){
	return (object = grid.get(nextMoveVector)) ? object : false;
};

Snake.prototype.digest = function(food, state, grid, lookVector){
	state[food.id] = false;
	state.food = food;
	
	grid.remove(food.vector);

	if(food.point > 0){	
		this.addScales(food.vector, grid);
		return food.vector.add(lookVector);
	}else{
		this.removeScales(grid);
		return food.vector;
	}
};


function Boundry(){
	this.walls = [new Wall(new Vector(0, 0)), new Wall(new Vector(0, 1)), new Wall(new Vector(0, 2)), new Wall(new Vector(0, 3)),
				new Wall(new Vector(0, 4)), new Wall(new Vector(0, 5)), new Wall(new Vector(0, 6)), new Wall(new Vector(0, 7)),
				new Wall(new Vector(0, 8)), new Wall(new Vector(0, 9)), new Wall(new Vector(0, 10)), new Wall(new Vector(0, 11)),
				new Wall(new Vector(0, 12)), new Wall(new Vector(0, 13)), new Wall(new Vector(0, 14)), new Wall(new Vector(0, 15)),
				new Wall(new Vector(0, 16)), new Wall(new Vector(0, 17)), new Wall(new Vector(0, 18)), new Wall(new Vector(0, 19)),
				new Wall(new Vector(0, 20)), new Wall(new Vector(0, 21)), new Wall(new Vector(0, 22)), new Wall(new Vector(0, 23)),
				new Wall(new Vector(0, 24)), new Wall(new Vector(0, 25)), new Wall(new Vector(0, 26)), new Wall(new Vector(0, 27)), 
				new Wall(new Vector(0, 28)), new Wall(new Vector(0, 29)),
				
				new Wall(new Vector(1, 0)), new Wall(new Vector(2, 0)), new Wall(new Vector(3, 0)), new Wall(new Vector(4, 0)),
				new Wall(new Vector(5, 0)), new Wall(new Vector(6, 0)), new Wall(new Vector(7, 0)), new Wall(new Vector(8, 0)),
				new Wall(new Vector(9, 0)), new Wall(new Vector(10, 0)), new Wall(new Vector(11, 0)), new Wall(new Vector(12, 0)),
				new Wall(new Vector(13, 0)), new Wall(new Vector(14, 0)), new Wall(new Vector(15, 0)), new Wall(new Vector(16, 0)),
				new Wall(new Vector(17, 0)), new Wall(new Vector(18, 0)), new Wall(new Vector(19, 0)), new Wall(new Vector(20, 0)),
				new Wall(new Vector(21, 0)), new Wall(new Vector(22, 0)), new Wall(new Vector(23, 0)), new Wall(new Vector(24, 0)),
				new Wall(new Vector(25, 0)), new Wall(new Vector(26, 0)), new Wall(new Vector(27, 0)), new Wall(new Vector(28, 0)),
				
				new Wall(new Vector(29, 0)), new Wall(new Vector(29, 1)), new Wall(new Vector(29, 2)), new Wall(new Vector(29, 3)),
				new Wall(new Vector(29, 4)), new Wall(new Vector(29, 5)), new Wall(new Vector(29, 6)), new Wall(new Vector(29, 7)),
				new Wall(new Vector(29, 8)), new Wall(new Vector(29, 9)), new Wall(new Vector(29, 10)), new Wall(new Vector(29, 11)),
				new Wall(new Vector(29, 12)), new Wall(new Vector(29, 13)), new Wall(new Vector(29, 14)), new Wall(new Vector(29, 15)),
				new Wall(new Vector(29, 16)), new Wall(new Vector(29, 17)), new Wall(new Vector(29, 18)), new Wall(new Vector(29, 19)),
				new Wall(new Vector(29, 20)), new Wall(new Vector(29, 21)), new Wall(new Vector(29, 22)), new Wall(new Vector(29, 23)),
				new Wall(new Vector(29, 24)), new Wall(new Vector(29, 25)), new Wall(new Vector(29, 26)), new Wall(new Vector(29, 27)), 
				new Wall(new Vector(29, 28)), new Wall(new Vector(29, 29)),
				
				new Wall(new Vector(1, 29)), new Wall(new Vector(2, 29)), new Wall(new Vector(3, 29)), new Wall(new Vector(4, 29)),
				new Wall(new Vector(5, 29)), new Wall(new Vector(6, 29)), new Wall(new Vector(7, 29)), new Wall(new Vector(8, 29)),
				new Wall(new Vector(9, 29)), new Wall(new Vector(10, 29)), new Wall(new Vector(11, 29)), new Wall(new Vector(12, 29)),
				new Wall(new Vector(13, 29)), new Wall(new Vector(14, 29)), new Wall(new Vector(15, 29)), new Wall(new Vector(16, 29)),
				new Wall(new Vector(17, 29)), new Wall(new Vector(18, 29)), new Wall(new Vector(19, 29)), new Wall(new Vector(20, 29)),
				new Wall(new Vector(21, 29)), new Wall(new Vector(22, 29)), new Wall(new Vector(23, 29)), new Wall(new Vector(24, 29)),
				new Wall(new Vector(25, 29)), new Wall(new Vector(26, 29)), new Wall(new Vector(27, 29)), new Wall(new Vector(28, 29))];
	
	//this.initWalls();
}
