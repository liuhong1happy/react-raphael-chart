const Vector2  = require('./base/Vector2');
var Utils = {
    getLineData(options,serise){
        var {width,height,xAxis,yAxis} = options;
		var {data,formatter} = serise;
		var axisW = yAxis.width || 60;
		var axisH = xAxis.height || 60;
		var chartW = width - axisW;
		var chartH = height - axisH;
		var yInterval = chartH / ( yAxis.max - yAxis.min );
		var xInterval = chartW / (xAxis.max - xAxis.min );

		for(var i=0;i<data.length;i++){
			data[i]._x = xInterval * data[i].x + axisW;
			data[i]._y = (chartH - yInterval * data[i].y) + 15;
			data[i]._label = !!formatter ? formatter(data[i]) : (data[i].label || data[i].x);
		}

		return {
			Values: data
		}
    },
	getAxisData(options){
		var {width,height,xAxis,yAxis} = options;
		var axisW = yAxis.width || 60;
		var axisH = xAxis.height || 60;
		var chartW = width - axisW;
		var chartH = height - axisH;
		var yInterval = chartH / ( yAxis.max - yAxis.min );
		var xInterval = chartW / (xAxis.max - xAxis.min );
		var xValues = [];
		var yValues = [];
		for(var i=xAxis.min;i<xAxis.max;i=i+xAxis.interval){
			xValues.push({
				x: (i-xAxis.min)*xInterval + axisW,
				y1: chartH +15,
				y2: chartH + 22,
				label: !!xAxis.formatter ? xAxis.formatter(i) : i,
				color: xAxis.color || "#737373"
			})
		}
		for(var i=yAxis.min;i<=yAxis.max;i=i+yAxis.interval){
			yValues.push({
				y: (chartH - (i-yAxis.min)*yInterval) + 15,
				x1: axisW,
				x2: axisW -7,
				label: !!yAxis.formatter ? yAxis.formatter(i) : i,
				color: xAxis.color || "#737373"
			})
		}
			
		return {
			xValues: xValues,
			yValues: yValues,
			xMin: axisW,
			xMax: width,
			yMin: 15,
			yMax: chartH + 15
		}
	},
	getControlPoint:function(path) {
		var rt = 0.3;
		var i = 0, count = path.length - 2;
		var arr = [];
		for (; i < count; i++) {
			var a = {x:path[i]._x,y:path[i]._y};
			var b = {x:path[i+1]._x,y:path[i+1]._y};
			var c = {x:path[i+2]._x,y:path[i+2]._y}
			var v1 = new Vector2(a.x - b.x, a.y - b.y);
			var v2 = new Vector2(c.x - b.x, c.y - b.y);
			var v1Len = v1.length(), v2Len = v2.length();
			var centerV = v1.normalize().add(v2.normalize()).normalize();
			var ncp1 = new Vector2(centerV.y, centerV.x * -1);
			var ncp2 = new Vector2(centerV.y * -1, centerV.x);
			if (ncp1.angle(v1) < 90) {
				var p1 = ncp1.multiply(v1Len * rt).add(b);
				var p2 = ncp2.multiply(v2Len * rt).add(b);
				arr.push(p1, p2)
			} else {
				var p1 = ncp1.multiply(v2Len * rt).add(b);
				var p2 = ncp2.multiply(v1Len * rt).add(b);
				arr.push(p2, p1)
			}
    	}
		return arr;
	}
}

module.exports = Utils;