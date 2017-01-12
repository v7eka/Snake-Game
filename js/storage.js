function Scoore(){
	this.point = {
					value : 1,
					length: 0
				};
}

Scoore.prototype.getTotalScoore = function(){
	return this.point.value*this.point.length
};

Scoore.prototype.alterPointLength = function(len){
	this.point.length += len;
};

