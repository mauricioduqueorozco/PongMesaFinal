
var COMPONENT_TYPES = {
		POINT : 1,
		LINE : 2,
		CIRCLE : 3,
		RECTANGLE : 4,
		LINE_ANGLE : 5
};


function Component() {
	this.active = true;
	this.type = 0; 
	//this.color = "black";
}

Component.prototype.setActive = function(active) {
	this.active = active;
};

Component.prototype.isActive = function() {
	return this.active;
};

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

function Rectangle(x1, y1, x2, y2, name, color, lineWidth) {
	Line.call(this, x1, y1, x2, y2, name, color, lineWidth);
	
	this.type = COMPONENT_TYPES.RECTANGLE;
}
Rectangle.prototype = new Line();
Rectangle.prototype.constructor = Rectangle;

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


