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

var Axis = require('./base/Axis');
var Utils = require('./utils');

var BarSerise = function (_React$Component) {
	_inherits(BarSerise, _React$Component);

	function BarSerise() {
		_classCallCheck(this, BarSerise);

		return _possibleConstructorReturn(this, (BarSerise.__proto__ || Object.getPrototypeOf(BarSerise)).apply(this, arguments));
	}

	_createClass(BarSerise, [{
		key: 'getDefaultPath',
		value: function getDefaultPath() {
			var _props = this.props,
			    width = _props.width,
			    height = _props.height,
			    xAxis = _props.xAxis,
			    yAxis = _props.yAxis;

			return ["M", yAxis.width, height - xAxis.height + 15, "L", width, height - xAxis.height + 15];
		}
	}, {
		key: 'getBarPath',
		value: function getBarPath() {
			var data = this.getDrawPoints();
			var path = [];
			if (data.length >= 1) {
				path.push(["M", data[0]._x, data[0]._y]);
				for (var i = 1; i < _data.length; i++) {
					path.push(["L", data[i]._x, data[i]._y]);
				}
			} else {
				path.push(["M", data[0]._x || 0, data[0]._y || 0]);
			}
			return path;
		}
	}, {
		key: 'getCurvePath',
		value: function getCurvePath(first) {
			var data = this.getDrawPoints();
			var path = [];
			var controls = Utils.getControlPoint(data);
			var pathData = ["M" + first.x + "," + first.y + "C" + first.x + "," + first.y + " " + controls[0].x + "," + controls[0].y + " " + data[1]._x + "," + data[1]._y];
			for (var i = 1; i < data.length - 1; i++) {
				if (i == data.length - 2) {
					pathData.push("C" + controls[controls.length - 1].x + "," + controls[controls.length - 1].y + " " + data[i + 1]._x + "," + data[i + 1]._y + " " + data[i + 1]._x + "," + data[i + 1]._y);
				} else {
					var control1 = controls[i * 2 - 1],
					    control2 = controls[i * 2];
					pathData.push("C" + control1.x + "," + control1.y + " " + control2.x + "," + control2.y + " " + data[i + 1]._x + "," + data[i + 1]._y);
				}
			}
			return pathData;
		}
	}, {
		key: 'getDrawPoints',
		value: function getDrawPoints() {
			var _props2 = this.props,
			    width = _props2.width,
			    height = _props2.height,
			    serise = _props2.serise,
			    xAxis = _props2.xAxis,
			    yAxis = _props2.yAxis,
			    index = _props2.index,
			    count = _props2.count;

			serise._index = index;
			serise._count = count;
			var data = Utils.getBarData({ width: width, height: height, xAxis: xAxis, yAxis: yAxis }, serise);
			return data.Values;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    serise = _props3.serise,
			    height = _props3.height,
			    xAxis = _props3.xAxis;

			var data = this.getDrawPoints();
			var defaultY = height - xAxis.height + 15;
			return React.createElement(
				Set,
				null,
				data.map(function (ele, pos) {
					return React.createElement(Rect, { x: ele._x - ele._width / 2, y: defaultY, width: ele._width, height: 0,
						attr: { "fill": serise.color },
						animate: Raphael.animation({ "y": ele._y, "height": ele._height }, 500, "<>") });
				})
			);
		}
	}]);

	return BarSerise;
}(React.Component);

var BarChart = function (_React$Component2) {
	_inherits(BarChart, _React$Component2);

	function BarChart(props) {
		_classCallCheck(this, BarChart);

		return _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));
	}

	_createClass(BarChart, [{
		key: 'getSerisePointsByIndex',
		value: function getSerisePointsByIndex(index) {
			var points = [];
			var _props4 = this.props,
			    serises = _props4.serises,
			    width = _props4.width,
			    height = _props4.height,
			    xAxis = _props4.xAxis,
			    yAxis = _props4.yAxis;

			var serise = serises[index];
			serise._index = index;
			serise._count = serises.length + 1;
			var data = Utils.getBarData({ width: width, height: height, xAxis: xAxis, yAxis: yAxis }, serise);
			return data.Values;
		}
	}, {
		key: 'getSeriseAllPoints',
		value: function getSeriseAllPoints() {
			var serises = this.props.serises;

			var points = [];
			for (var i = 0; i < serises.length; i++) {
				points = points.concat(this.getSerisePointsByIndex(i));
			}
			return points;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props5 = this.props,
			    width = _props5.width,
			    height = _props5.height,
			    serises = _props5.serises,
			    xAxis = _props5.xAxis,
			    yAxis = _props5.yAxis,
			    grid = _props5.grid;

			return React.createElement(
				Paper,
				{ width: width, height: height },
				React.createElement(Axis, { type: 'bar', width: width, height: height, xAxis: xAxis, yAxis: yAxis, grid: grid }),
				serises.map(function (ele, pos) {
					return React.createElement(BarSerise, { ref: "serise" + pos, index: pos, count: serises.length + 1, width: width, height: height,
						serise: ele, xAxis: xAxis, yAxis: yAxis });
				}),
				this.props.children
			);
		}
	}]);

	return BarChart;
}(React.Component);

BarChart.propTypes = {
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	serises: React.PropTypes.array,
	xAxis: React.PropTypes.object,
	yAxis: React.PropTypes.object,
	grid: React.PropTypes.object
};
BarChart.defaultProps = {
	width: 600,
	height: 400,
	serises: [],
	xAxis: {
		min: 0,
		max: 10,
		interval: 1,
		formatter: null,
		height: 60
	},
	yAxis: {
		min: 0,
		max: 100,
		interval: 10,
		formatter: null,
		width: 60
	},
	grid: {
		color: "#ccc",
		thickness: 1,
		showYGrid: false,
		showXGrid: true
	}
};

module.exports = BarChart;