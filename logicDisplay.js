function LogicDisplay() {
	this.components = new Array();
      
}


LogicDisplay.prototype.init = function() {
    
};


LogicDisplay.prototype.addComponent = function(component) {
	this.components.push(component);
 
};

LogicDisplay.prototype.test = function() {
   /* this.components.push(new Line(0, 0, 100, 100, 'p1', 'red', 7));
    this.components.push(new LineAngle(0, 0, 100, 30, 'p2', 'green', 3));*/
   this.components.push(new Rectangle(0, 0,22, 222, '','red', 1));
    /*this.components.push(new Circle(100, 100, 10));*/
    
};


