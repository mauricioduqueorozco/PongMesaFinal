function GraphicDisplay(ctx, width, height){
	this.ctx = ctx;

	this.width = width;
	this.height = height;

	this.angle = null;
	this.rot = new logicalMath();
	this.coord = null;

	this.ancho_mdf = 0;
	this.ancho_mesa = 0;
	this.largo = 0; // largo de mesa
	this.alto_mesa = 0; // alto de mesa
	this.densidad = 0;
	this.scaleFactor = 300;
	this.middleX = this.width / 2;
	this.middleY = this.height / 2;
	this.distance = 0;
	this.gravity = 9.81; //gravedad
	this.ancho_perfil = 0;
	this.zoomFactor = 1;
	this.fuerza = 0;
	this.masa = 100;
	this.pesoPerfil = 0.79 / this.gravity; // por metro.
	this.moveX = 0;
	this.moveY =0;
	this.fx = 0;
	this.fy = 0;
};

GraphicDisplay.prototype.init = function() {
	
	this.logicDisplay = new LogicDisplay();
	//this.logicDisplay.test()
	this.normMedidas();
	this.elements();
	this.centrosMasa(this.logicDisplay.components);
	this.ejes(this.logicDisplay.components);
	this.setDisplay(false);
	
};

GraphicDisplay.prototype.normMedidas = function(){
	this.ancho_mdf = this.ancho_mdf * this.scaleFactor;
	this.ancho_mesa = this.ancho_mesa * this.scaleFactor;
	this.largo = this.largo * this.scaleFactor;
	this.alto_mesa = this.alto_mesa * this.scaleFactor;
	this.ancho_perfil = this.ancho_perfil * this.scaleFactor;
};

GraphicDisplay.prototype.elements = function(){
	this.logicDisplay.addComponent(new LineAngle( this.middleX, 
													this.middleY, 
													this.largo * 2 / 3, 
													0, 
													'mesa',
												 	'white',
												  	0.5));
	this.logicDisplay.addComponent(new LineAngle( this.middleX, 
													this.middleY, 
													this.largo / 3, 
													180, 
													'mesa_back',
												 	'white',
												  	0.5));




	this.logicDisplay.addComponent(new LineAngle( this.middleX + this.largo * 2 / 3, 
													this.middleY - (this.ancho_mdf) * 2, 
													this.ancho_mdf, 
													90, 
													'tapa1',
												 	'white',
												  	0.5));

	this.logicDisplay.addComponent(new LineAngle( this.middleX - this.largo /3, 
													this.middleY - (this.ancho_mdf) * 2, 
													this.ancho_perfil, 
													90, 
													'tapa2',
												 	'white',
												  	0.5));

	this.logicDisplay.addComponent(new LineAngle( this.middleX + this.largo * 2 / 3, 
													this.middleY, 
													this.ancho_perfil, 
													270, 
													'tapa1P',
												 	'white',
												  	0.5));

	this.logicDisplay.addComponent(new LineAngle( this.middleX - this.largo /3, 
													this.middleY, 
													this.ancho_mdf, 
													90, 
													'tapa2P',
												 	'white',
												  	0.5));

	this.logicDisplay.addComponent(new LineAngle(this.middleX - this.largo /3,
												this.middleY  + this.ancho_mdf, 
												this.largo,
												0,
											 	'tapa3',
											  	'white', 
											  	0.5));

	this.logicDisplay.addComponent(new LineAngle(this.middleX + this.largo * 2 / 3,
												this.middleY - this.ancho_perfil, 
												this.largo,
												180,
											 	'tapa4',
											  	'white', 
											  	0.5));
	
	this.logicDisplay.addComponent(new Line(this.middleX + this.ancho_perfil / 2,
												this.middleY - this.alto_mesa / 2, 
												this.middleX + this.largo / 3 + this.ancho_perfil / 2,
												this.middleY - this.alto_mesa / 2 + this.ancho_mdf,
											 	'pie',
											  	'red', 
											  	2));


	//centro de para movil superior
	this.logicDisplay.addComponent(new Circle(this.middleX + this.largo / 3,
												this.middleY,
												10,
												'c2'));
	
	this.logicDisplay.addComponent(new Circle(this.middleX + this.largo / 3 + this.ancho_perfil / 2,
												this.middleY - this.alto_mesa / 2 + this.ancho_perfil,
												10,
												'c4'));
	this.logicDisplay.addComponent(new Rectangle(this.middleX + this.largo / 3,
													 this.middleY,
													 this.middleX + this.largo / 3 + this.ancho_perfil,
													 this.middleY - this.alto_mesa + this.ancho_perfil + this.ancho_mdf,
													 'p_movil',
													 'red',
													 1));
	this.logicDisplay.addComponent(new Rectangle(this.middleX + 2,
													 this.middleY - (this.ancho_perfil * 2 / 3),
													 this.middleX + this.ancho_perfil,
													 this.middleY - this.alto_mesa + this.ancho_perfil + this.ancho_mdf,
													 'p_fija',
													 'red',
													 1));
}
GraphicDisplay.prototype.centrosMasa = function(components){
	var mesa = this.findObject(components,'mesa');
	var mesa_back = this.findObject(components,'mesa_back');
	var p_movil = this.findObject(components,'p_movil');
	var pie = this.findObject(components,'pie');
	var tapa1 = this.findObject(components,'tapa1');
	var tapa2 = this.findObject(components,'tapa2');

	this.logicDisplay.addComponent(new Circle(components[mesa].x1 + components[mesa].l / 2,
												this.middleY - this.ancho_perfil / 2,
												5,
												'cm1'));
	this.logicDisplay.addComponent(new Circle(components[mesa].x1 + components[mesa].l / 2,
												this.middleY + this.ancho_mdf / 2,
												5,
												'cm2'));
	this.logicDisplay.addComponent(new Circle(components[mesa_back].x1 - components[mesa_back].l / 2,
												this.middleY + this.ancho_mdf / 2,
												5,
												'cm3'));
	this.logicDisplay.addComponent(new Circle(components[mesa_back].x1 - components[mesa_back].l / 2,
												this.middleY - this.ancho_perfil / 2,
												5,
												'cm4'));
	this.logicDisplay.addComponent(new Circle((components[p_movil].x1 + components[p_movil].x2) / 2,
												(components[p_movil].y1 + components[p_movil].y2) / 2,
												5,
												'cm5'));
	this.logicDisplay.addComponent(new Circle((components[pie].x1 + components[pie].x2) / 2,
												(components[pie].y1 + components[pie].y2) / 2,
												5,
												'cm6'));
	//Centro de gravedad general 
	this.logicDisplay.addComponent(new Circle(components[mesa_back].x1 - components[mesa_back].l,
												components[mesa_back].y1,
												5,
												'cm7'));
	this.logicDisplay.addComponent(new Circle(  (components[tapa2].x1 + components[tapa1].x1) / 2,
												((components[tapa2].y1 + components[tapa1].y1) / 2) - this.ancho_perfil / 2,
												5,
												'cm8'));
	this.logicDisplay.addComponent(new Circle(  (components[tapa2].x1 + components[tapa1].x1) / 2,
												((components[tapa2].y1 + components[tapa1].y1) / 2) - this.ancho_perfil - this.ancho_mdf / 2,
												5,
												'cm9'));
};
GraphicDisplay.prototype.ejes = function(components){
	var cm9 = this.findObject(components,'cm9');
	var cm8 = this.findObject(components,'cm8');
	var cm7 = this.findObject(components,'cm7');
	var cm6 = this.findObject(components,'cm6');
	var cm5 = this.findObject(components,'cm5');
	var cm4 = this.findObject(components,'cm4');
	var cm3 = this.findObject(components,'cm3');
	var cm2 = this.findObject(components,'cm2');
	var cm1 = this.findObject(components,'cm1');
	var pie = this.findObject(components,'pie');
	var tapa1 = this.findObject(components,'tapa1');
	var tapa2 = this.findObject(components,'tapa2');

	this.logicDisplay.addComponent(new LineAngle(components[cm7].x1,
												components[cm7].y1, 
												50,
												270,
											 	'eje7',
											  	'green', 
											  	1.5));

	this.logicDisplay.addComponent(new LineAngle(components[cm6].x1,
												components[cm6].y1, 
												this.getDistance(components[pie].x1,
													components[pie].y1,
													components[pie].x2,
													components[pie].y2) * this.gravity * this.pesoPerfil,
												270,
											 	'eje6',
											  	'green', 
											  	1.5));

	this.logicDisplay.addComponent(new LineAngle(components[cm5].x1,
												components[cm5].y1, 
												this.gravity * (this.alto_mesa - this.ancho_mdf - this.ancho_perfil) * this.pesoPerfil,
												270,
											 	'eje5',
											  	'green', 
											  	1.5));
	this.logicDisplay.addComponent(new LineAngle(components[cm7].x1,
												components[cm7].y1, 
												50,
												180,
											 	'eje4',
											  	'green', 
											  	1.5));
	this.logicDisplay.addComponent(new LineAngle(components[cm3].x1,
												components[cm3].y1, 
												50,
												270,
											 	'eje3',
											  	'pink', 
											  	1.5));
	this.logicDisplay.addComponent(new LineAngle(components[tapa1].x1,
												components[tapa1].y1 + this.ancho_perfil, 
												50,
												180,
											 	'eje2',
											  	'green', 
											  	1.5));
	this.logicDisplay.addComponent(new LineAngle(components[tapa1].x1,
												components[tapa1].y1 + this.ancho_perfil, 
												50,
												90,
											 	'eje1',
											  	'green', 
											  	1.5));

	this.logicDisplay.addComponent(new LineAngle(components[tapa1].x1,
												components[tapa1].y1, 
												50,
												90,
											 	'ejeF',
											  	'blue', 
											  	1.5));
	this.logicDisplay.addComponent(new LineAngle(components[tapa2].x1,
												components[tapa2].y1, 
												50,
												270,
											 	'ejeF1',
											  	'blue', 
											  	1.5));
	this.logicDisplay.addComponent(new LineAngle(components[cm8].x1,
												components[cm8].y1, 
												50,
												270,
											 	'ejeC',
											  	'green', 
											  	1.5));
	this.logicDisplay.addComponent(new LineAngle(components[cm9].x1,
												components[cm9].y1, 
												50,
												270,
											 	'ejeC1',
											  	'green', 
											  	1.5));

};
GraphicDisplay.prototype.clearAll = function() {
	this.ctx.restore();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
	this.ctx.save();
};

GraphicDisplay.prototype.drawLine = function(x , y , x1 , y1, color, lineWidth) {

	this.ctx.lineWidth = lineWidth;
	this.ctx.fillStyle = color;
	this.ctx.strokeStyle = color;
	this.ctx.beginPath();
            this.ctx.moveTo(x , this.height - y);
            this.ctx.lineTo(x1 , this.height - y1);
        this.ctx.closePath();
	this.ctx.stroke();
};
GraphicDisplay.prototype.drawLineAngle = function(x , y , l , a , color, lineWidth) {
	this.ctx.beginPath();
	this.ctx.lineWidth = lineWidth;
	this.ctx.strokeStyle = color; 
	this.ctx.moveTo(x, this.height - y);
		this.ctx.lineTo(this.getCoorX(x,a,l),
						this.height - this.getCoorY(y,a,l));
	this.ctx.closePath();
	this.ctx.stroke();
};
GraphicDisplay.prototype.drawRectangle = function(x,y,x1,y1,color, lineWidth){
	this.drawLine(x,y,x1,y,color, lineWidth)
	this.drawLine(x1,y,x1,y1,color, lineWidth)
	this.drawLine(x1,y1,x,y1,color, lineWidth)
	this.drawLine(x,y1,x,y,color, lineWidth)
};

GraphicDisplay.prototype.drawCircle = function(x1, y1, radius) {
	this.ctx.lineWidth = 0.5;
	this.ctx.fillStyle = 'red';
	this.ctx.strokeStyle = 'red';
	this.ctx.beginPath();
	this.ctx.arc(x1, this.height - y1, radius,0, Math.PI * 2, false);
	this.ctx.arc(x1, this.height - y1, radius / 2,0, Math.PI * 2, false);
	this.ctx.closePath();
	this.ctx.stroke();
};



GraphicDisplay.prototype.execute = function() {
	this.clearAll();
	this.drawAllComponents(this.logicDisplay.components);
	this.move(this.logicDisplay.components);
};
GraphicDisplay.prototype.drawAllComponents = function(components) {
	for (var i = 0; i < components.length; i++) {
		if ( !components[i].isActive() )
			continue;
		
		this.drawComponent(components[i]);
	}
};
GraphicDisplay.prototype.drawComponent = function(component) {

	/*this.zoomFactor = 1 / Math.round(controller.axes[2] * 100);
	if (this.zoomFactor == 0){
		this.zoomFactor = 1;
	}else if (this.zoomFactor < 0 ) {
		this.zoomFactor = - this.zoomFactor;
	};*/
	switch (component.type) {
		

		case COMPONENT_TYPES.LINE:
			this.drawLine(component.x1 * this.zoomFactor,
						component.y1 * this.zoomFactor,
						component.x2 * this.zoomFactor,
						component.y2 * this.zoomFactor,
						component.color,
						component.lineWidth
						);
                                        
  
			break;
		case COMPONENT_TYPES.RECTANGLE:
			this.drawRectangle(component.x1 * this.zoomFactor,
						component.y1 * this.zoomFactor,
						component.x2 * this.zoomFactor,
						component.y2 * this.zoomFactor,
						component.color,
						component.lineWidth
						);
                                        
  
			break;
		case COMPONENT_TYPES.LINE_ANGLE:
			this.drawLineAngle(component.x1 * this.zoomFactor,
						component.y1 * this.zoomFactor,
						component.l * this.zoomFactor,
						component.a,
						component.color,
						component.lineWidth
						);
                                        
  
			break;
		case COMPONENT_TYPES.CIRCLE:
			this.drawCircle(
					component.x1 * this.zoomFactor,
					component.y1 * this.zoomFactor,
					component.radius * this.zoomFactor);
			break;
		
	}
};
GraphicDisplay.prototype.move = function(components){
	var mesa = this.findObject(components,'mesa');
	var mesa_back = this.findObject(components,'mesa_back');
	var pie = this.findObject(components,'pie');
	var p_movil = this.findObject(components,'p_movil');
	var c2 = this.findObject(components,'c2');
	var c4 = this.findObject(components,'c4');
	var fx = this.findObject(components,'fx');
	var fy = this.findObject(components,'fy');
	var tapa1 = this.findObject(components,'tapa1');
	var tapa2 = this.findObject(components,'tapa2');
	var tapa3 = this.findObject(components,'tapa3');
	var tapa4 = this.findObject(components,'tapa4');
	var tapa1P = this.findObject(components,'tapa1P');
	var tapa2P = this.findObject(components,'tapa2P');
	var cm9 = this.findObject(components,'cm9');
	var cm8 = this.findObject(components,'cm8');
	var cm7 = this.findObject(components,'cm7');
	var cm6 = this.findObject(components,'cm6');
	var cm5 = this.findObject(components,'cm5');
	var cm4 = this.findObject(components,'cm4');
	var cm3 = this.findObject(components,'cm3');
	var cm2 = this.findObject(components,'cm2');
	var cm1 = this.findObject(components,'cm1');
	var eje1 = this.findObject(components,'eje1');
	var eje2 = this.findObject(components,'eje2');
	var eje3 = this.findObject(components,'eje3');
	var eje4 = this.findObject(components,'eje4');
	var eje5 = this.findObject(components,'eje5');
	var eje6 = this.findObject(components,'eje6');
	var eje7 = this.findObject(components,'eje7');
	var ejeF = this.findObject(components,'ejeF');
	var ejeF1 = this.findObject(components,'ejeF1');
	var ps3 = 0;


	//ps3 = -Math.round(controller.axes[1] * 100); // quitar comentario si tiene un mando de PS3.

	var fuer = 0;
	if (this.fuerza == 0){
		if(ps3 >= 0){
		ps3 = ps3;
		}else{
			ps3 = 0;
		}
		fuer = ps3;
	}else{
		fuer = this.fuerza;
	}

	var angle = 90 - Math.acos(fuer / (8.93 * this.gravity)) * 180 / Math.PI;
	
	
	
	if(isNaN(angle)){
		angle = 90
	}

	components[mesa].a = angle;
	components[mesa_back].a = 180 + components[mesa].a;
	this.angle = angle;
	components[cm7].x1 = this.getCoorX(components[mesa_back].x1 ,
										components[mesa_back].a,
										components[mesa_back].l);

	components[cm7].y1 = this.getCoorY(components[mesa_back].y1 ,
										components[mesa_back].a,
										components[mesa_back].l);
	

	components[eje7].x1 = components[cm7].x1;
	components[eje7].y1 = components[cm7].y1;
	components[eje7].a = 270;
	components[eje7].l = fuer * -Math.sin(this.getAngle(components[ejeF1].a));

	components[eje4].x1 = components[cm7].x1;
	components[eje4].y1 = components[cm7].y1;
	components[eje4].a = 180;
	components[eje4].l = fuer * -Math.cos(this.getAngle(components[ejeF1].a));
	
	components[c2].x1 = this.getCoorX(components[mesa].x1 ,
										components[mesa].a,
										components[mesa].l / 2);
	components[c2].y1 = this.getCoorY(components[mesa].y1 ,
										components[mesa].a,
										components[mesa].l / 2);

	components[p_movil].x1 = components[c2].x1;
	components[p_movil].y1 = components[c2].y1;

	components[p_movil].x2 = this.getCoorX(components[p_movil].x1 + this.ancho_perfil,
											270,
											this.alto_mesa - this.ancho_mdf);
	components[p_movil].y2 = this.getCoorY(components[p_movil].y1 + this.ancho_perfil,
											270,
											this.alto_mesa - this.ancho_mdf);

	components[cm5].x1 = (components[p_movil].x1 + components[p_movil].x2) / 2;
	components[cm5].y1 = (components[p_movil].y1 + components[p_movil].y2) / 2;

	components[eje5].x1 = components[cm5].x1;
	components[eje5].y1 = components[cm5].y1;
	
					
	components[c4].x1 = components[p_movil].x2 - this.ancho_perfil /2;
	components[c4].y1 = components[p_movil].y2 + this.alto_mesa / 2 - this.ancho_mdf - this.ancho_perfil / 2;

	components[pie].x2 = components[c4].x1; 
	components[pie].y2 = components[c4].y1; 

	components[cm6].x1 = (components[pie].x1 + components[pie].x2) / 2;
	components[cm6].y1 = (components[pie].y1 + components[pie].y2) / 2;									
												
	components[eje6].x1 = components[cm6].x1; 
	components[eje6].y1 = components[cm6].y1; 											

	components[tapa1].x1 = this.getCoorX(components[mesa].x1 ,
										components[mesa].a,
										components[mesa].l); 
	components[tapa1].y1 = this.getCoorY(components[mesa].y1 ,
										components[mesa].a,
										components[mesa].l); 
	components[tapa1].a = 90 + components[mesa].a;

	components[tapa2].x1 = this.getCoorX(components[mesa_back].x1 ,
										components[mesa_back].a,
										components[mesa_back].l); 

	components[tapa2].y1 = this.getCoorY(components[mesa_back].y1 ,
										components[mesa_back].a,
										components[mesa_back].l); 
	components[tapa2].a = 90 + components[mesa_back].a;

	components[tapa2P].x1 = components[tapa2].x1;
	components[tapa2P].y1 = components[tapa2].y1;
	components[tapa2P].a = 180 + components[tapa2].a;

	components[ejeF].x1 = components[tapa1].x1;
	components[ejeF].y1 = components[tapa1].y1;
	components[ejeF].a =  0 + components[tapa1].a;
	components[ejeF].l = fuer;

	components[eje1].x1 = components[ejeF].x1;
	components[eje1].y1 = components[ejeF].y1;
	components[eje1].l = fuer * Math.sin(this.getAngle(components[ejeF].a));
	this.fx = components[eje1].l;

	components[eje2].x1 = components[ejeF].x1;
	components[eje2].y1 = components[ejeF].y1;
	components[eje2].l = fuer * -Math.cos(this.getAngle(components[ejeF].a));
	this.fy = components[eje2].l;

	components[ejeF1].x1 = components[tapa2].x1;
	components[ejeF1].y1 = components[tapa2].y1;
	components[ejeF1].a =  0 +  components[tapa2].a;
	components[ejeF1].l = fuer;
	

	components[tapa1P].x1 = components[tapa1].x1;
	components[tapa1P].y1 = components[tapa1].y1;
	components[tapa1P].a = 180 + components[tapa1].a;


	components[tapa3].x1 = this.getCoorX(components[tapa1].x1 ,
										components[tapa1].a,
										components[tapa1].l); 
	components[tapa3].y1 = this.getCoorY(components[tapa1].y1 ,
										components[tapa1].a,
										components[tapa1].l);
	components[tapa3].a = 90 + components[tapa1].a;

	components[tapa4].x1 = this.getCoorX(components[tapa2].x1 ,
										components[tapa2].a,
										components[tapa2].l); 
	components[tapa4].y1 = this.getCoorY(components[tapa2].y1 ,
										components[tapa2].a,
										components[tapa2].l);
	components[tapa4].a = 90 + components[tapa2].a;

	
												

};
GraphicDisplay.prototype.findObject = function(components,name){
	for (var i = 0; i < components.length; i++) {
		if(components[i].name == name){
			return i
		}
	}
};

GraphicDisplay.prototype.setAngle = function(angle){
	this.angle = Math.round( angle );
}
GraphicDisplay.prototype.getAngle = function(angle){
	var theta = angle * Math.PI / 180;
	return theta;
};
GraphicDisplay.prototype.getCoorX = function(x , a , l){
	var desp_X = Math.cos(this.getAngle(a)) * l + x;
	return desp_X
};
GraphicDisplay.prototype.getCoorY = function(y , a , l){
	var desp_Y = Math.sin(this.getAngle(a)) * l + y;
	return desp_Y
};
GraphicDisplay.prototype.setFuerza = function(fuerza){
	this.fuerza = Math.round( fuerza );

};

GraphicDisplay.prototype.getDistance = function(x,y,x1,y1){
	var distance = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
	return distance.toFixed(2);
};
GraphicDisplay.prototype.setDisplay = function(value){

	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm9')].setActive(false);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm8')].setActive(false);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm7')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm6')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm5')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm4')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm3')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm2')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'cm1')].setActive(value);	
	
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'ejeC')].setActive(false);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'ejeC1')].setActive(false);
	//this.logicDisplay.components[this.findObject(this.logicDisplay.components,'eje7')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'eje6')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'eje5')].setActive(value);
	//this.logicDisplay.components[this.findObject(this.logicDisplay.components,'eje4')].setActive(value);
	this.logicDisplay.components[this.findObject(this.logicDisplay.components,'eje3')].setActive(false);
	//this.logicDisplay.components[this.findObject(this.logicDisplay.components,'eje2')].setActive(value);
	//this.logicDisplay.components[this.findObject(this.logicDisplay.components,'eje1')].setActive(value);
	
};


