// Esta clase permite indexar de manera dinamica los elementos
// a dibujar, para hacer mucho mas facil su manipulacion.


function LogicDisplay() {
	this.components = new Array();
      
}


LogicDisplay.prototype.init = function() {
    
};

// metodo para agregar los componentes dentro del arreglo
LogicDisplay.prototype.addComponent = function(component) {
	this.components.push(component);
 
};

// metodo para hacer un test de funcionamiento.
LogicDisplay.prototype.test = function() {
   /* this.components.push(new Line(0, 0, 100, 100, 'p1', 'red', 7));
    this.components.push(new LineAngle(0, 0, 100, 30, 'p2', 'green', 3));*/
   this.components.push(new Rectangle(0, 0,22, 222, '','red', 1));
    /*this.components.push(new Circle(100, 100, 10));*/
    
};


