'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var Component = React.Component,
    PropTypes = React.PropTypes;

var ColumnSerise = function (_Component) {
	_inherits(ColumnSerise, _Component);

	function ColumnSerise() {
		_classCallCheck(this, ColumnSerise);

		return _possibleConstructorReturn(this, (ColumnSerise.__proto__ || Object.getPrototypeOf(ColumnSerise)).apply(this, arguments));
	}

	_createClass(ColumnSerise, [{
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
		key: 'getColumnPath',
		value: function getColumnPath() {
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
		key: 'getDrawPoints',
		value: function getDrawPoints() {
			var _props2 = this.props,
			    width = _props2.width,
			    height = _props2.height,
			    serise = _props2.serise,
			    xAxis = _props2.xAxis,
			    yAxis = _props2.yAxis,
			    index = _props2.index,
			    count = _props2.count,
			    barWidth = _props2.barWidth,
			    fontSize = _props2.fontSize;

			serise._index = index;
			serise._count = count;
			var data = Utils.getColumnData({ width: width, height: height, xAxis: xAxis, yAxis: yAxis, barWidth: barWidth, fontSize: fontSize }, serise);
			return data.Values;
		}
	}, {
		key: 'handleMouseOut',
		value: function handleMouseOut() {
			var data = this.items;
			this.attr({ "fill": data.color });
			if (data.textAutoHide) {
				this.set[1].hide();
			} else {
				this.set[1].attr({ "fill": data.color });
			}
		}
	}, {
		key: 'handleMouseOver',
		value: function handleMouseOver() {
			var data = this.items;
			data.color = this.attr("fill");
			this.attr({ "fill": data.hoverColor }).toFront();
			if (data.textAutoHide) {
				this.set[1].show().toFront();
			} else {
				this.set[1].attr({ "fill": data.hoverColor }).toFront();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    serise = _props3.serise,
			    height = _props3.height,
			    xAxis = _props3.xAxis,
			    fontSize = _props3.fontSize,
			    textAutoHide = _props3.textAutoHide;

			serise.textAutoHide = textAutoHide;
			var data = this.getDrawPoints();
			var defaultY = height - xAxis.height + 15;
			var handleMouseOut = this.handleMouseOut;
			var handleMouseOver = this.handleMouseOver;
			return React.createElement(
				Set,
				null,
				data.map(function (ele, pos) {
					return React.createElement(
						Set,
						{ key: pos },
						React.createElement(Rect, { key: "path" + pos, x: ele._x - ele._width / 2, y: defaultY, width: ele._width, height: 0, data: _extends({}, serise),
							attr: { "fill": ele.color || serise.color, "stroke": "none" }, mouseout: handleMouseOut, mouseover: handleMouseOver,
							animate: Raphael.animation({ "y": ele._y, "height": ele._height }, 500, "<>") }),
						React.createElement(Text, { key: "text" - pos, x: ele._x, y: ele._y - fontSize / 2, text: String(ele.y), attr: { "fill": textAutoHide ? serise.hoverColor : ele.color || serise.color, "font-size": fontSize }, hide: textAutoHide })
					);
				})
			);
		}
	}]);

	return ColumnSerise;
}(Component);

var ColumnChart = function (_Component2) {
	_inherits(ColumnChart, _Component2);

	function ColumnChart() {
		_classCallCheck(this, ColumnChart);

		return _possibleConstructorReturn(this, (ColumnChart.__proto__ || Object.getPrototypeOf(ColumnChart)).apply(this, arguments));
	}

	_createClass(ColumnChart, [{
		key: 'render',
		value: function render() {
			var _props4 = this.props,
			    width = _props4.width,
			    height = _props4.height,
			    serises = _props4.serises,
			    xAxis = _props4.xAxis,
			    yAxis = _props4.yAxis,
			    grid = _props4.grid,
			    fontSize = _props4.fontSize,
			    barWidth = _props4.barWidth,
			    textAutoHide = _props4.textAutoHide,
			    children = _props4.children;

			return React.createElement(
				Paper,
				{ width: width, height: height },
				React.createElement(Axis, { type: 'column', width: width, height: height, xAxis: xAxis, yAxis: yAxis, grid: grid }),
				serises.map(function (ele, pos) {
					return React.createElement(ColumnSerise, { key: pos, ref: "serise" + pos, index: pos, count: serises.length + 1, width: width, height: height, barWidth: barWidth, fontSize: fontSize,
						textAutoHide: textAutoHide, serise: ele, xAxis: xAxis, yAxis: yAxis });
				}),
				children
			);
		}
	}]);

	return ColumnChart;
}(Component);

ColumnChart.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	serises: PropTypes.arrayOf(PropTypes.object),
	xAxis: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number,
		interval: PropTypes.number,
		formatter: PropTypes.func,
		width: PropTypes.number
	}),
	yAxis: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number,
		interval: PropTypes.number,
		formatter: PropTypes.func,
		width: PropTypes.number
	}),
	grid: PropTypes.shape({
		color: PropTypes.string,
		thickness: PropTypes.number,
		showYGrid: PropTypes.bool,
		showXGrid: PropTypes.bool
	}),
	barWidth: PropTypes.number,
	fontSize: PropTypes.number,
	textAutoHide: PropTypes.bool
};
ColumnChart.defaultProps = {
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
	},
	barWidth: 20,
	fontSize: 14,
	textAutoHide: false
};

module.exports = ColumnChart;