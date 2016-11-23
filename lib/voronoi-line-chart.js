'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Voronoi = require('voronoi');
var React = require('react');
var LineChart = require('./line-chart');

var _require = require('react-raphael'),
    Set = _require.Set,
    Text = _require.Text,
    Path = _require.Path,
    Circle = _require.Circle;

var Utils = require('./utils');

var Cell = function (_React$Component) {
	_inherits(Cell, _React$Component);

	function Cell() {
		_classCallCheck(this, Cell);

		return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).apply(this, arguments));
	}

	_createClass(Cell, [{
		key: 'handleMouseOver',
		value: function handleMouseOver() {
			this.set[0][0].show();
			this.set.toFront();
		}
	}, {
		key: 'handleMouseOut',
		value: function handleMouseOut() {
			this.set[0][0].hide();
			//		this.set.toBack();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props$data = this.props.data,
			    site = _props$data.site,
			    halfedges = _props$data.halfedges;
			var _props = this.props,
			    label = _props.label,
			    color = _props.color;

			var path = [];
			for (var i = 0; i < halfedges.length; i++) {
				var _halfedges$i$edge = halfedges[i].edge,
				    va = _halfedges$i$edge.va,
				    vb = _halfedges$i$edge.vb,
				    lSite = _halfedges$i$edge.lSite;

				if (i == 0) path.push(["M", va.x, va.y]);else if (i == halfedges.length - 1) {
					if (site.x == lSite.x && site.y == lSite.y) path.push(["L", va.x, va.y, "L", vb.x, vb.y, "Z"]);else path.push(["L", vb.x, vb.y, "L", va.x, va.y, "Z"]);
				} else {
					if (site.x == lSite.x && site.y == lSite.y) path.push(["L", va.x, va.y]);else path.push(["L", vb.x, vb.y]);
				}
			}

			return React.createElement(
				Set,
				null,
				React.createElement(
					Set,
					null,
					React.createElement(Text, { x: site.x, y: site.y, text: String(site.v), attr: { "fill": color }, hide: true, translate: { x: 0, y: 10 } }),
					React.createElement(Circle, { x: site.x, y: site.y, r: 3, attr: { "fill": color, "stroke": "#fff" } })
				),
				React.createElement(Path, { d: path, attr: { "fill": "none", "stroke": "none" }, mouseover: this.handleMouseOver, mouseout: this.handleMouseOut })
			);
		}
	}]);

	return Cell;
}(React.Component);

var VoronoiLineChart = function (_React$Component2) {
	_inherits(VoronoiLineChart, _React$Component2);

	function VoronoiLineChart() {
		_classCallCheck(this, VoronoiLineChart);

		return _possibleConstructorReturn(this, (VoronoiLineChart.__proto__ || Object.getPrototypeOf(VoronoiLineChart)).apply(this, arguments));
	}

	_createClass(VoronoiLineChart, [{
		key: 'getSeriseAllPoints',
		value: function getSeriseAllPoints() {
			var _props2 = this.props,
			    width = _props2.width,
			    height = _props2.height,
			    serises = _props2.serises,
			    xAxis = _props2.xAxis,
			    yAxis = _props2.yAxis;

			var points = [];
			for (var i = 0; i < serises.length; i++) {
				var data = Utils.getLineData({ width: width, height: height, xAxis: xAxis, yAxis: yAxis }, serises[i]);
				points = points.concat(data.Values);
			}
			return points;
		}
	}, {
		key: 'compute',
		value: function compute() {
			var _props3 = this.props,
			    width = _props3.width,
			    height = _props3.height;

			var data = this.getSeriseAllPoints();
			var points = [];
			for (var i = 0; i < data.length; i++) {
				points.push({
					x: data[i]._x,
					y: data[i]._y,
					v: data[i]._label,
					color: data[i].color
				});
			}
			var voronoi = new Voronoi();
			var bbox = { xl: 44, xr: width + 1, yt: 14, yb: height - 14 };
			var diagram = voronoi.compute(points, bbox);

			this.result = diagram;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.compute();
			this.setState({
				update: true
			});
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			this.compute();
		}
	}, {
		key: 'render',
		value: function render() {
			this.result = this.result || {};
			var cells = this.result.cells || [];
			return React.createElement(
				LineChart,
				_extends({ ref: 'chart' }, this.props),
				cells.map(function (ele, pos) {
					return React.createElement(Cell, { key: pos + "-" + ele.site.x + "-" + ele.site.y, data: ele, label: "test", color: ele.site.color });
				})
			);
		}
	}]);

	return VoronoiLineChart;
}(React.Component);

VoronoiLineChart.propTypes = {
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	serises: React.PropTypes.array,
	xAxis: React.PropTypes.object,
	yAxis: React.PropTypes.object,
	grid: React.PropTypes.object
};
VoronoiLineChart.defaultProps = {
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
module.exports = VoronoiLineChart;