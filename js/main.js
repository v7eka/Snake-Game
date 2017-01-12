function attribute(){
	return { 'unit' : 30 ,
			'size' : 900, 
   			'zoom': 0.5, 
   			'clock' : 200,
   			};
}


function main(){
	var canvas = document.getElementById('game');
	if(!(ctx = canvas.getContext('2d'))) return;		
	
	var unit = attribute().unit, 
		size = attribute().size /*30px X 30px*/, 
		clock = attribute().clock,
		zoom = attribute().zoom,
		
		actualSize = size * zoom,
		actualUnit = unit * zoom;
	
	canvas.width = actualSize;
	canvas.height = actualSize;
	
	var game = new Game(actualSize, actualUnit, ctx, clock);	
	game.init();
	
	var keyboard = window.addEventListener("keydown", function(e){
		if (e.keyCode == '13') { game.run();}
	}, false);
}

window.onload = main;
