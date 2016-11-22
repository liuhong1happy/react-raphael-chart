'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('react-raphael'),
    Raphael = _require.Raphael,
    Paper = _require.Paper,
    Set = _require.Set,
    Text = _require.Text,
    Rect = _require.Rect,
    Path = _require.Path,
    Circle = _require.Circle;

var PieChart = function (_React$Component) {
	_inherits(PieChart, _React$Component);

	function PieChart(props) {
		_classCallCheck(this, PieChart);

		var _this = _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).call(this, props));

		_this.repeatCount = 0;
		return _this;
	}

	_createClass(PieChart, [{
		key: 'getPathDataByAngle',
		value: function getPathDataByAngle() {
			var rad = Math.PI / 180;
			var _props = this.props,
			    center = _props.center,
			    radius = _props.radius,
			    color = _props.color,
			    total = _props.total,
			    value = _props.value,
			    label = _props.label;


			if (total < value) throw new error("total is not smaller than value");
			if (total == 0) throw new error("the total is not zero");

			var angle = value / total * 360;

			if (angle == 0) return { defaultPath: [], paths: [], angle: 0 };
			if (angle == 360) angle = 359.9;
			var paths = [];
			var x1 = center.x;
			var y1 = center.y - radius;

			for (var i = 0; i <= 100; i++) {
				var x2 = center.x + radius * Math.sin(angle / 100 * i * rad);
				var y2 = center.y - radius * Math.cos(angle / 100 * i * rad);
				paths.push(["M", center.x, center.y, "L", x1, y1, "A", radius, radius, 0, +(angle / 100 * i > 180), 1, x2, y2, "Z"]);
			}
			return {
				defaultPath: paths[0],
				paths: paths,
				angle: angle
			};
		}
	}, {
		key: 'handleLoaded',
		value: function handleLoaded(path) {
			var data = path.items;
			var percent = 0;
			var _props2 = this.props,
			    easing = _props2.easing,
			    animate = _props2.animate,
			    repeat = _props2.repeat;

			easing = easing || function () {
				return 10;
			};
			var callAnimate = function callAnimate() {

				if (percent <= 100) {
					var animate = Raphael.animation({ path: data[percent] }, easing(percent), "linear", callAnimate);
					path.animate(animate);
				}
				percent++;
			};

			if (data.length == 101) {
				if (repeat && this.repeatCount == 1) return false;
				if (!animate) return false;
				path.stop();
				callAnimate();
				this.repeatCount++;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    width = _props3.width,
			    height = _props3.height,
			    background = _props3.background,
			    center = _props3.center,
			    radius = _props3.radius,
			    color = _props3.color,
			    label = _props3.label,
			    position = _props3.position,
			    fontsize = _props3.fontsize,
			    style = _props3.style,
			    className = _props3.className,
			    children = _props3.children,
			    others = _objectWithoutProperties(_props3, ['width', 'height', 'background', 'center', 'radius', 'color', 'label', 'position', 'fontsize', 'style', 'className', 'children']);

			var data = this.getPathDataByAngle();
			var textPosition = { x: position ? position.x : center.x, y: position ? position.y : center.y + radius / 3 };
			return React.createElement(
				Paper,
				{ width: width, height: height, container: _extends({ "style": style, "className": className || "pie-chart" }, others) },
				React.createElement(Circle, { x: center.x, y: center.y, r: radius, attr: { "fill": background, "stroke": "none" } }),
				React.createElement(Path, { d: data.defaultPath, attr: { "fill": color, "stroke": "none" }, data: data.paths, load: this.handleLoaded.bind(this), update: this.handleLoaded.bind(this) }),
				React.createElement(Text, { x: textPosition.x, y: textPosition.y, text: label, attr: { "fill": data.angle > 180 ? "#fff" : "#444", "font-size": fontsize || 10, "stroke": "none" } }),
				children
			);
		}
	}]);

	return PieChart;
}(React.Component);

PieChart.propTypes = {
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	color: React.PropTypes.string,
	background: React.PropTypes.string,
	center: React.PropTypes.object,
	value: React.PropTypes.number,
	label: React.PropTypes.string,
	total: React.PropTypes.number,
	radius: React.PropTypes.number,
	style: React.PropTypes.object,
	className: React.PropTypes.string,
	fontsize: React.PropTypes.number,
	animate: React.PropTypes.bool,
	repeat: React.PropTypes.bool
};
PieChart.defaultProps = {
	color: "#74C93C",
	background: "#DDD",
	radius: 48,
	center: { x: 50, y: 50 },
	label: "98%",
	value: 98,
	total: 100,
	width: 100,
	height: 100,
	style: {},
	fontsize: 14,
	className: "doughnut-chart",
	animate: true,
	repeat: false
};

module.exports = PieChart;