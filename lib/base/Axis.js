'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Utils = require('../utils');

var _require = require('react-raphael'),
    Path = _require.Path,
    Set = _require.Set,
    Text = _require.Text;

var Line = function (_React$Component) {
	_inherits(Line, _React$Component);

	function Line() {
		_classCallCheck(this, Line);

		return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
	}

	_createClass(Line, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    x1 = _props.x1,
			    x2 = _props.x2,
			    y1 = _props.y1,
			    y2 = _props.y2,
			    others = _objectWithoutProperties(_props, ['x1', 'x2', 'y1', 'y2']);

			return React.createElement(Path, _extends({ d: ["M", x1, y1, "L", x2, y2] }, others));
		}
	}]);

	return Line;
}(React.Component);

var Grid = function (_React$Component2) {
	_inherits(Grid, _React$Component2);

	function Grid() {
		_classCallCheck(this, Grid);

		return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
	}

	_createClass(Grid, [{
		key: 'render',
		value: function render() {
			var _props$data = this.props.data,
			    xMin = _props$data.xMin,
			    xMax = _props$data.xMax,
			    yMin = _props$data.yMin,
			    yMax = _props$data.yMax,
			    xValues = _props$data.xValues,
			    yValues = _props$data.yValues;
			var _props$grid = this.props.grid,
			    color = _props$grid.color,
			    thickness = _props$grid.thickness,
			    showYGrid = _props$grid.showYGrid,
			    showXGrid = _props$grid.showXGrid;

			if (!showXGrid) yValues = [];
			if (!showYGrid) xValues = [];
			return React.createElement(
				Set,
				null,
				xValues.map(function (ele, pos) {
					return React.createElement(Line, { key: pos, x1: ele.x, y1: yMin, x2: ele.x, y2: yMax, attr: { "stroke": color, "stroke-width": thickness } });
				}),
				yValues.map(function (ele, pos) {
					return React.createElement(Line, { key: pos, x1: xMin, y1: ele.y, x2: xMax, y2: ele.y, attr: { "stroke": color, "stroke-width": thickness } });
				})
			);
		}
	}]);

	return Grid;
}(React.Component);

var YAxis = function (_React$Component3) {
	_inherits(YAxis, _React$Component3);

	function YAxis() {
		_classCallCheck(this, YAxis);

		return _possibleConstructorReturn(this, (YAxis.__proto__ || Object.getPrototypeOf(YAxis)).apply(this, arguments));
	}

	_createClass(YAxis, [{
		key: 'render',
		value: function render() {
			var yValues = this.props.yValues;
			var _props$grid2 = this.props.grid,
			    color = _props$grid2.color,
			    thickness = _props$grid2.thickness;

			return React.createElement(
				Set,
				null,
				yValues.map(function (ele, pos) {
					return React.createElement(Line, { key: pos, x1: ele.x1, y1: ele.y, x2: ele.x2, y2: ele.y, attr: { "stroke": color, "stroke-width": thickness } });
				}),
				yValues.map(function (ele, pos) {
					return React.createElement(Text, { key: pos, x: ele.x1 - 12, y: ele.y, text: String(ele.label), attr: { "fill": ele.color, "text-anchor": "end", "font-size": 14 } });
				})
			);
		}
	}]);

	return YAxis;
}(React.Component);

var XAxis = function (_React$Component4) {
	_inherits(XAxis, _React$Component4);

	function XAxis() {
		_classCallCheck(this, XAxis);

		return _possibleConstructorReturn(this, (XAxis.__proto__ || Object.getPrototypeOf(XAxis)).apply(this, arguments));
	}

	_createClass(XAxis, [{
		key: 'render',
		value: function render() {
			var xValues = this.props.xValues;
			var _props$grid3 = this.props.grid,
			    color = _props$grid3.color,
			    thickness = _props$grid3.thickness;

			var type = this.props.type;
			return React.createElement(
				Set,
				null,
				xValues.map(function (ele, pos) {
					return React.createElement(Line, { key: pos, x1: ele.x, y1: ele.y1, x2: ele.x, y2: ele.y2, attr: { "stroke": color, "stroke-width": thickness } });
				}),
				xValues.map(function (ele, pos) {
					var x = ele.x;
					if (type == "bar") x = ele.x + ele.interval / 2;
					return React.createElement(Text, { key: pos, x: x, y: ele.y2 + 12, text: String(ele.label), attr: { "fill": ele.color, "font-size": 14 } });
				})
			);
		}
	}]);

	return XAxis;
}(React.Component);

var Axis = function (_React$Component5) {
	_inherits(Axis, _React$Component5);

	function Axis() {
		_classCallCheck(this, Axis);

		return _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).apply(this, arguments));
	}

	_createClass(Axis, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    width = _props2.width,
			    height = _props2.height,
			    xAxis = _props2.xAxis,
			    yAxis = _props2.yAxis,
			    grid = _props2.grid,
			    type = _props2.type;

			var data = Utils.getAxisData({ width: width, height: height, xAxis: xAxis, yAxis: yAxis, type: type });

			return React.createElement(
				Set,
				null,
				React.createElement(XAxis, { xValues: data.xValues, grid: grid, type: type }),
				React.createElement(YAxis, { yValues: data.yValues, grid: grid }),
				React.createElement(Grid, { grid: grid, data: data })
			);
		}
	}]);

	return Axis;
}(React.Component);

module.exports = Axis;