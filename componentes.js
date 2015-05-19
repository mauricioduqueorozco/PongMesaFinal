// Esta es la clase constructora de los elementos,
// se crea con el objetivo de estandarizar la creacion
// de los elementos, para su mejor manupulacion.
// De esta forma se pueden agregar de manera ordenada en el 
// Arreglo de objetos.

// arreblo de tipo del elemento
var COMPONENT_TYPES = {
		POINT : 1,
		LINE : 2,
		CIRCLE : 3,
		RECTANGLE : 4,
		LINE_ANGLE : 5
};

// para cualquier componente, el tipo y si esta activado
// Por defecto se pone la activacion en verdadero.
function Component() {
	this.active = true;
	this.type = 0; 
	//this.color = "black";
}

// SET de activacion
Component.prototype.setActive = function(active) {
	this.active = active;
};

// Retorna si el elemento esta activo o no.
Component.prototype.isActive = function() {
	return this.active;
};

// Elemento constructor de linea
function Line(x1, y1, x2, y2, name, color, lineWidth) {
	Component.call(this);
	
	this.type = COMPONENT_TYPES.LINE;
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;
	this.name = '';
	this.color = 'black';
	this.lineWidth = 0.5;
	
	if ( x1 !== undefined
		&& y1 !== undefined
		&& x2 !== undefined
		&& y2 !== undefined
		&& name !== undefined
		&& color !== undefined
		&& lineWidth !== undefined)
	{
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.name = name;
		this.color = color;
		this.lineWidth = lineWidth;
	}
}
Line.prototype = new Component();
Line.prototype.constructor = Line;

// Elemento constructor de Rectangulos y hereda de Line
function Rectangle(x1, y1, x2, y2, name, color, lineWidth) {
	Line.call(this, x1, y1, x2, y2, name, color, lineWidth);
	
	this.type = COMPONENT_TYPES.RECTANGLE;
}
Rectangle.prototype = new Line();
Rectangle.prototype.constructor = Rectangle;

// Elemento creador de Linea bajo parametro:
// una sola cordenada, longitud y angulo con respecto a la horizontal
// nombre del elemento, color y tamano de linea
function LineAngle(x1, y1, l, a , name , color, lineWidth) {
	Component.call(this);
	
	this.type = COMPONENT_TYPES.LINE_ANGLE;
	this.x1 = 0;
	this.y1 = 0;
	this.l = 0;
	this.a = 0;
	this.name = '';
	this.color = 'black';
	this.lineWidth = 0.5;
	
	if ( x1 !== undefined
		&& y1 !== undefined
		&& l !== undefined
		&& a !== undefined
		&& name !== undefined
		&& color !== undefined
		&& lineWidth !== undefined)
	{
		this.x1 = x1;
		this.y1 = y1;
		this.l = l;
		this.a = a;
		this.name = name;
		this.color = color;
		this.lineWidth = lineWidth;
	}
}
LineAngle.prototype = new Component();
LineAngle.prototype.constructor = LineAngle;


// elemento  constructor de Circulos, a partir de un punto
// y el radio
function Circle(x1, y1, radius, name) {
	Line.call(this);
	
	this.type = COMPONENT_TYPES.CIRCLE;
	this.x1 = 0;
	this.y1 = 0;
	this.radius = 0;
	this.name = '';
	
	
	if ( x1 !== undefined
		&& y1 !== undefined
		&& radius !== undefined
		&& name !== undefined
		)
	{
		this.x1 = x1;
		this.y1 = y1;
		this.radius = radius;
		this.name = name;
	}

}
Circle.prototype = new Component();
Circle.prototype.constructor = Circle;


