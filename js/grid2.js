function Vector(x, y) {
	this.x = x; this.y = y;
}

Vector.prototype.add = function(other) {
	return new Vector(this.x + other.x, this.y + other.y);
};

function Grid(){
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
	if(index){
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

Grid.prototype.freeSpot = function(){
	
	/*width = 0-29; height = 0-29*/
	/*this.space = new Array((this.size*this.size)*(this.zoom*this.zoom)/(this.unit*this.unit));*/
		
}
