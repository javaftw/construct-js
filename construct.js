var Construct = (function construct() {

	// TODO: add width, height, and other animatable properties
	var Construct = {
		KeyValueType: {
			OPACITY: 0,
			TRANSLATE: 1,
			ROTATE: 2,
			SCALE: 3
		}
	};

	var Animation, KeyFrame, KeyValue;

	Construct.Animation = Animation = function(options) {
		options = options || {};
		this.element = options.element;
		this.name = options.name;
		this.duration = options.duration || 1000;
		this.timingFunction = options.timingFunction || 'linear';
		this.delay = options.delay || 0;
		this.iterationCount = options.iterationCount || 1;
		this.direction = options.direction || 'normal';
		this.fillMode = 'forwards';
		this.keyFrames = options.keyFrames;
	};

	Animation.prototype.addKeyFrame = function(keyFrame) {
		this.keyFrames.push(keyFrame);
	};

	Animation.prototype.export = function() {
		var keyFramesString = this.name + "{\n";
		var duration = this.duration;
		for (var i = 0; i < this.keyFrames.length; i++) {
			var currentKeyFrame = this.keyFrames[i];
			var percentage = Math.round((currentKeyFrame.time / duration) * 100);
			keyFramesString += percentage + '% {\n';
			for (var j = 0; j < currentKeyFrame.values.length; j++) {

			}
		}
	};

	Animation.prototype.start = function() {
		$("body").append(
			"<style>\n" +
			this.element + ' { ' 
				'animation-name: ' + this.name + ';\n' +
				'animation-duration: ' + this.duration + 'ms;\n' + 
				'animation-timing-function: ' + this.timingFunction + ';\n' + 
				'animation-delay: ' + this.delay + ';\n' + 
				'animation-iteration-count: ' + this.iterationCount + ';\n' + 
				'animation-direction: ' + this.direction + ';\n' + 
				'animation-fill-mode: ' + this.fillMode + ';\n' + 
			"}\n" +
			"</style>"
		);
	};

	Construct.KeyFrame = KeyFrame = function(time, values) {
		this.time = time;
		var valueIndices = [];
		for (var i = 0; i < values.length; i++) {
			// TODO: check for multiple transforming values, put them into one value
		}
	};

	Construct.KeyValue = KeyValue = function(valueType, value) {
		this.isTransform = valueType != 0;
		if (valueType == Construct.KeyValueType.OPACITY) {
			this.value = 'opacity: ';
			if (!Array.isArray(value)) {
				this.value += value;
			} else {
				this.value = 'opacity: ' + value[0];
			}
		} else { 
			this.value = 'transform: ';
			if (valueType == Construct.KeyValueType.TRANSLATE) {
				if (Array.isArray(value)) {
					if (value.length == 2) {
						this.value += 'translate(' + value[0] + 'px, ' + value[1] + 'px)';
					} else if (value.length == 3) {
						this.value += 'translate3d(' + value[0] + 'px,' + value[1] + 'px, ' + value[2] + 'px)';
					}
				}
			} else if (valueType == Construct.KeyValueType.ROTATE) {
				if (Array.isArray(value)) {
					if (value.length == 3) {
						this.value += 'rotateX(' + value[0] + 'deg), rotateY(' + value[1] + 'deg), rotateZ(' + value[2] + 'deg)';
					}
				} else {
					this.value += 'rotate(' + value + 'deg)';
				}
			} else if (valueType == Construct.KeyValueType.SCALE) {
				if (Array.isArray(value)) {
					if (value.length == 2) {
						this.value += 'scale(' + value[0] + ', ' + value[1] + ')';
					}
				}
			}
		}
	};



	this.KeyFrame = function(options) {
		this.value = options.value;
		this.time = options.time;
	}

	return Construct;
})();
