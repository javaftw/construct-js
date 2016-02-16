'use strict';

var Construct = (function() {

	// TODO: add width, height, and other animatable properties
	var _Construct = {
		KeyValueType: {
			OPACITY: {
				isTransform: false,
				id: 0
			},
			TRANSLATE: {
				isTransform: true,
				id: 1
			},
			ROTATE: {
				isTransform: true,
				id: 2
			},
			SCALE: {
				isTransform: true,
				id: 3
			}
		}
	};

    var TAB_1 = '    ';
    var TAB_2 = '        ';

	var Animation, KeyFrame, KeyValue;

	_Construct.Animation = Animation = function(options) {
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
		var keyFramesString = this.name + " {\n";
		var duration = this.duration;
		for (var i = 0; i < this.keyFrames.length; i++) {
			var currentKeyFrame = this.keyFrames[i];
			var percentage = Math.round((currentKeyFrame.time / duration) * 100);
			keyFramesString += TAB_1 + percentage + '% {\n';
            if (currentKeyFrame.hasTransforms) {
                keyFramesString += 
                                TAB_2 + currentKeyFrame.endTransformValue + ';\n' + 
                                TAB_2 + '-webkit-' + currentKeyFrame.endTransformValue + ';';
            }
			for (var j = 0; j < currentKeyFrame.values.length; j++) {
                for (var k = 0; k < currentKeyFrame.values.length; k++) {
                    keyFramesString += TAB_2 + currentKeyFrame.values[i].value + ';';
                }
			}
            keyFramesString += '\n' + TAB_1 + '}\n';
		}
        keyFramesString += '}\n';
        $('body').append('<style> @keyframes ' + keyFramesString + '\n\n@-webkit-keyframes ' + keyFramesString + '\n</style>');
	};

	Animation.prototype.start = function() {
		$("body").append(
			"<style>\n" +
			this.element + ' {\n ' +
			'    animation-name: ' + this.name + ';\n' +
			'    animation-duration: ' + this.duration + 'ms;\n' + 
			'    animation-timing-function: ' + this.timingFunction + ';\n' + 
			'    animation-delay: ' + this.delay + ';\n' + 
			'    animation-iteration-count: ' + this.iterationCount + ';\n' + 
			'    animation-direction: ' + this.direction + ';\n' + 
			'    animation-fill-mode: ' + this.fillMode + ';\n' + 
			"}\n" +
			"</style>"
		);
	};

	_Construct.KeyFrame = KeyFrame = function(time, values) {
		this.time = time;
		var transformCount = 0, valueIndices = [], transformValues = [];
		for (var i = 0; i < values.length; i++) {
			if (values[i].valueType.isTransform) {
				transformCount++;
				valueIndices.push(i);
			}
		}

		for (var i = valueIndices.length - 1; i >= 0; i--) {
			transformValues.push(values.splice(valueIndices[i], 1)[0]);
		}

		for (var i = 0; i < transformValues.length; i++) {
			transformValues[i] = transformValues[i].simpleValue;
		}

        this.values = values;
		this.endTransformValue = 'transform: ' + transformValues.join(" ");
		this.hasTransforms = transformCount != 0;
	};

	_Construct.KeyValue = KeyValue = function(valueType, value) {
		this.valueType = valueType;
		this.simpleValue = '';

		if (valueType.id == _Construct.KeyValueType.OPACITY.id) {
			if (!Array.isArray(value)) {
				this.value = 'opacity: ' + value;
			}
		} else { 
			this.value = 'transform: ';
			if (valueType.id == _Construct.KeyValueType.TRANSLATE.id) {
				if (Array.isArray(value)) {
					if (value.length == 2) {
						this.value += this.simpleValue = 'translate(' + value[0] + 'px, ' + value[1] + 'px)';
					} else if (value.length == 3) {
						this.value += this.simpleValue = 'translate3d(' + value[0] + 'px, ' + value[1] + 'px, ' + value[2] + 'px)';
					}
				}
			} else if (valueType.id == _Construct.KeyValueType.ROTATE.id) {
				if (Array.isArray(value)) {
					if (value.length == 3) {
						this.value += this.simpleValue = 'rotateX(' + value[0] + 'deg) rotateY(' + value[1] + 'deg) rotateZ(' + value[2] + 'deg)';
					}
				} else {
					this.value += this.simpleValue = 'rotate(' + value + 'deg)';
				}
			} else if (valueType.id == _Construct.KeyValueType.SCALE.id) {
				if (Array.isArray(value)) {
					if (value.length == 2) {
						this.value += this.simpleValue = 'scale(' + value[0] + ', ' + value[1] + ')';
					}
				}
			}
		}
	};

	return _Construct;
})();
