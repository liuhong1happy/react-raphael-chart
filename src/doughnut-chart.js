const React = require('react');
const { Raphael, Paper, Set, Text, Rect,Path, Circle } = require('react-raphael');
const PieChart = require('./pie-chart');

class DoughnutChart extends React.Component{
	getPathDataByAngle(){
		var rad = Math.PI / 180;
		var {center,radius,color, total, value,label} = this.props;
		
		if(total<value) throw new error("total is not smaller than value");
		if(total==0) throw new error("the total is not zero");
		
		var angle = value / total * 360;

		if(angle==0)  return { defaultPath: [], paths: [], angle: 0 };
		if(angle==360) angle = 359.9;
		var paths = [];
		var x1 = center.x;
		var y1 = center.y - radius;
		
		for(var i=0;i<=100;i++){
			var x2 = center.x + radius * Math.sin( angle / 100 * i * rad );
			var y2 = center.y - radius * Math.cos( angle / 100 * i * rad );
			paths.push( ["M",center.x, center.y, "L",x1,y1, "A",radius,radius, 0, +(angle / 100 * i >180), 1, x2,y2,"Z"] )
		}
		return {
			defaultPath: paths[0],
			paths: paths,
			angle: angle
		}
	}
	render(){
		var {center,radius,label,thickness,position,fontsize, style,className} = this.props;
		var data = this.getPathDataByAngle();
		var textPosition = { x: position ? position.x : center.x, y: position ? position.y : center.y+radius/3}
		return (<PieChart {...this.props}>
                <Circle x={center.x} y={center.y} r={radius-thickness} attr={{ "fill": "#fff", "stroke": "none" }} />
                <Text x={textPosition.x} y={textPosition.y} text={label} attr={{ "fill": "#444", "font-size": fontsize || 10 , "stroke": "none" }} />
				</PieChart>)
	}
}

DoughnutChart.propTypes = { 
	width: React.PropTypes.number, 
	height: React.PropTypes.number,
	color: React.PropTypes.string, 
	background: React.PropTypes.string, 
	center: React.PropTypes.object, 
	value:  React.PropTypes.number,
    label: React.PropTypes.string,
    total: React.PropTypes.number,
    radius:  React.PropTypes.number,
    thickness: React.PropTypes.number,
	style: React.PropTypes.object, 
	className: React.PropTypes.string, 
	fontsize: React.PropTypes.number,
	animate: React.PropTypes.bool,
	repeat: React.PropTypes.bool
};

DoughnutChart.defaultProps = { 
	color: "#74C93C",
	background: "#DDD",
	radius: 48,
	center: { x: 50,y: 50},
	label: "98%",
	value: 98,
	total: 100,
	width: 100,
	height: 100,
    thickness: 3,
	style: {},
	fontsize: 14,
	className: "doughnut-chart",
	animate: true,
	repeat: false
};

module.exports = DoughnutChart;