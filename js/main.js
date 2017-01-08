function attribute(unit, size, zoom, clock){
   return { 'unit' : unit||15 ,
   			'size' : size||900, 
   			'zoom': zoom||0.5, 
   			'clock' : clock||1000 
   			};
}


function main(){
	var canvas = document.getElementById('game');
	if(!(ctx = canvas.getContext('2d'))) return;		
	
	var unit = attribute().unit, 
		size = attribute().size /*30px X 30px*/, 
		clock = attribute().clock,
		zoom = attribute().zoom;
	

	canvas.width = size * zoom;
	canvas.height = size * zoom;
	
	var game = new Game(size, unit, ctx, clock);	
	
	game.start();
}

window.onload = main;
