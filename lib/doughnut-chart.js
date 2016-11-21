'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var PieChart = require('./pie-chart');

var DoughnutChart = function (_React$Component) {
	_inherits(DoughnutChart, _React$Component);

	function DoughnutChart() {
		_classCallCheck(this, DoughnutChart);

		return _possibleConstructorReturn(this, (DoughnutChart.__proto__ || Object.getPrototypeOf(DoughnutChart)).apply(this, arguments));
	}

	_createClass(DoughnutChart, [{
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
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    center = _props2.center,
			    radius = _props2.radius,
			    label = _props2.label,
			    thickness = _props2.thickness;

			var data = this.getPathDataByAngle();

			return React.createElement(
				PieChart,
				this.props,
				React.createElement(Circle, { x: center.x, y: center.y, r: radius - thickness, attr: { "fill": "#fff", "stroke": "none" } }),
				React.createElement(Text, { x: center.x, y: center.y + radius / 3, text: label, attr: { "fill": "#444", "stroke": "none" } })
			);
		}
	}]);

	return DoughnutChart;
}(React.Component);

DoughnutChart.propTypes = {
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	color: React.PropTypes.string,
	background: React.PropTypes.string,
	center: React.PropTypes.object,
	value: React.PropTypes.number,
	label: React.PropTypes.string,
	total: React.PropTypes.number,
	radius: React.PropTypes.number,
	thickness: React.PropTypes.number
};

DoughnutChart.defaultProps = {
	color: "#74C93C",
	background: "#DDD",
	radius: 48,
	center: { x: 50, y: 50 },
	label: "98%",
	value: 98,
	total: 100,
	width: 100,
	height: 100,
	thickness: 3
};

module.exports = DoughnutChart;