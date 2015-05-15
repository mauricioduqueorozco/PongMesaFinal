function logicalMath(){
	/*var x = 100,
		y = 100,
		angle = 20;*/
	
};
logicalMath.prototype.getRotation = function(xc , yc , x, y, angle){
	var alpha = angle * Math.PI / 180;
	var x_prima = Math.round(xc + (x - xc) * Math.cos(alpha) - (y - yc) * Math.sin(alpha));
	var y_prima = Math.round(yc + (x - xc) * Math.sin(alpha) + (y - yc) * Math.cos(alpha));

	return({x : x_prima,
			y : y_prima});
};

logicalMath.prototype.getTraslation = function(x1 , y1 , tx , ty){
	var x_prima = x1 + tx;
	var y_prima = y1 + ty;
	return({x : x_prima,
			y : y_prima});
};





