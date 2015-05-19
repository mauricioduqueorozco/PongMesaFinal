// Esta funcion es la principal para iniciar el programa.
// El evento "window.onload" se ejecuta cuando la pagina 
// ya esta cargada.

window.onload = function() {

	// set de color de fondo de pagina
	document.body.style.background = "black";
	// Crea el elemento "canvas"
	var canvas = document.createElement("canvas");
	// Asigna el tamano del camvas y su id
	canvas.width = 1000;
	canvas.height = 600;
	canvas.id = 'canvas';
	// anexa el canvas dentro de la pagina DOM.
	document.body.appendChild(canvas);
	// Le asigna el contexto
	var ctx = canvas.getContext("2d");
	
	// Crea una instancia del objeto "GraphicDisplay".
	var gd = new GraphicDisplay(ctx, canvas.width, canvas.height);
	
	// Crea la instancia del panel de controles
	var text = new this.FizzyText();
	var gui = new dat.GUI();

	//var angulo = gui.add(text, 'Angulo', 0, 90).listen();
	var fuerza = gui.add(text, 'Fuerza', 0, 500);
	var ancho_mesa = gui.add(text, 'Ancho_Mesa');
	var ancho_mdf = gui.add(text, 'Ancho_MDF');
	var largo = gui.add(text, 'Largo');
	var alto_mesa = gui.add(text, 'Alto_Mesa');
	var densidad = gui.add(text, 'Densidad_MDF');
	var ancho_perfil = gui.add(text, 'Ancho_Perfil');
	gui.add(text, 'Angulo', 0, 90).listen();
	gui.add(text, 'Fuerza_X').listen();
	gui.add(text, 'Fuerza_Y').listen();

	// Actualiza las variables en el panel de control
	var update = function() {
	  //requestAnimationFrame(update);
	  text.Angulo = gd.angle;
	  text.Fuerza_X = gd.fx;
	  text.Fuerza_Y = gd.fy;
	};

	

	gui.add(text, 'Peso');
	var displayCentros = gui.add(text, 'displayCentros');

	// asigna las variables del panel al engine del programa
	gd.ancho_mesa = ancho_mesa.initialValue;
	gd.largo = largo.initialValue;
	gd.ancho_mdf = ancho_mdf.initialValue;
	gd.alto_mesa = alto_mesa.initialValue;
	gd.densidad = densidad.initialValue;
	gd.ancho_perfil = ancho_perfil.initialValue;
	

	// Eventos	
	displayCentros.onChange(function(value) {
		 gd.setDisplay(value);
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
    
    // Inicializa el engine
	gd.init();
	
	// ejecuta el metodo "execute"
	// en un intervalo de 5 ms
	// en si es el motor de render.
	setInterval(function () {
		gd.execute();
		update();
	}, 5);


};





