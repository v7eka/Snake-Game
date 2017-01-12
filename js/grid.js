function Vector(x, y) {
	this.x = x; this.y = y;
}

Vector.prototype.add = function(other) {
	return new Vector(this.x + other.x, this.y + other.y);
};

function Grid(size){
	this.size = size;	
	this.space = [];
}

Grid.prototype.get = function(vector){
	return this.space.find(function(object){
		return ((object.vector.x == vector.x) && (object.vector.y == vector.y));
	});
}

Grid.prototype.set = function(object){
	this.space.push(object);
}

Grid.prototype.getObjectIndex = function(vector){
	return this.space.findIndex(function(object){		
		return ((object.vector.x == vector.x) && (object.vector.y == vector.y));
	});
}

Grid.prototype.remove = function(vector){
	var index = this.getObjectIndex(vector);
	if(index > -1) {
		this.space.splice(index, 1);
	}
}

Grid.prototype.renderLoop = function(render){
	this.space.forEach(function(spot){
		if(spot !== null){
			render(spot.id, spot.vector);
		}
	});
}

Grid.prototype.getRandomInt = function(lower, upper) {
	var temp = Math.floor(Math.random() * (upper - lower + 1) + lower) ;
	return temp;
}

Grid.prototype.freeSpot = function(){
	/*width = 1-28; height = 1-28*/
	var x = this.getRandomInt(1, Math.pow(this.size, 0.5) - 3);
	var y = this.getRandomInt(1, Math.pow(this.size, 0.5) - 3);
	var spot = new Vector(x, y);
	
	if(!this.get(spot)){
		return spot;
	}else{
		return this.freeSpot();
	}
}

