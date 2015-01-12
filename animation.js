function Animation(options) {
	this.duration = options.duration;
	this.transforms = [];
}

Animation.prototype.rotate = function(degrees) {
	this.transforms.push("rotate(" + degrees + "deg)");
	return this;
}

Animation.prototype.translate = function(x, y) {
	this.transforms.push("translate(" + x + "," + y + ")");
	return this;
}

Animation.prototype.skew = function(x, y) {
	this.transforms.push("skew(" + x + "deg," + y + "deg)");
	return this;
}

Animation.prototype.rotate3d = function(x, y, z) {
	this.transforms.push("rotateX(" + x + "deg)");
	this.transforms.push("rotateY(" + y + "deg)");
	this.transforms.push("rotateZ(" + z + "deg)");
	return this;
}

Animation.prototype.translate3d = function(x, y, z) {
	this.transforms.push("translateX(" + x + ")");
	this.transforms.push("translateY(" + y + ")");
	this.transforms.push("translateZ(" + z + ")");
	return this;
}

Animation.prototype.skew3d = function(x, y, z) {
	this.transforms.push("skewX(" + x + ")");
	this.transforms.push("skewY(" + y + ")");
	this.transforms.push("skewZ(" + z + ")");
	return this;
}

Animation.prototype.export = function() {
	var transformsString = "";
	for (var i = 0; i < this.transforms.length; i++) {
		transformsString += this.transforms[i] + " ";
	}
	return "transform: " + transformsString + "; -webkit-transform: " + transformsString + ";";
}