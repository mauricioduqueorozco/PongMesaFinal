window.onload = function() {


	document.body.style.background = "black";
	var canvas = document.createElement("canvas");
	canvas.width = 1000;
	canvas.height = 450;
	canvas.id = 'canvas';
	document.body.appendChild(canvas);
	var ctx = canvas.getContext("2d");
	
	var gd = new GraphicDisplay(ctx, canvas.width, canvas.height);
	
	var text = new this.FizzyText();
	var gui = new dat.GUI();

	var controller = gui.add(text, 'Angulo', 0, 90);
	var fuerza = gui.add(text, 'Fuerza', 0, 100);
	var ancho_mesa = gui.add(text, 'Ancho_Mesa');
	var ancho_mdf = gui.add(text, 'Ancho_MDF');
	var largo = gui.add(text, 'Largo');
	var alto_mesa = gui.add(text, 'Alto_Mesa');
	var densidad = gui.add(text, 'Densidad_MDF');

	gui.add(text, 'Peso');
	var displayCentros = gui.add(text, 'displayCentros');

	gd.ancho_mesa = ancho_mesa.initialValue;
	gd.largo = largo.initialValue;
	gd.ancho_mdf = ancho_mdf.initialValue;
	gd.alto_mesa = alto_mesa.initialValue;
	gd.densidad = densidad.initialValue;

	displayCentros.onChange(function(value) {
		 gd.setDisplay(value);
	});
	
	controller.onChange(function(value) {
		
	});

	fuerza.onChange(function(value) {
		 gd.setFuerza(value);
	});

	ancho_mesa.onChange(function(value) {
		 gd.ancho_mesa = value;
	});

	ancho_mdf.onChange(function(value) {
		 gd.ancho_mdf = value;
	});

	largo.onChange(function(value) {
		 gd.largo = value;
	});

	alto_mesa.onChange(function(value) {
		 gd.alto_mesa = value;
	});

	densidad.onChange(function(value) {
		 gd.densidad = value;
		 
	});

	gd.init();
	setInterval(function () {
		gd.execute();
		console.log('ee')
	}, 5);


};





