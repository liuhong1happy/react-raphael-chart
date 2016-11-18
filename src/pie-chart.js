const React = require('react');
const { Raphael, Paper, Set, Text, Rect,Path, Circle } = require('react-raphael');

class PieChart extends React.Component{
	getPathDataByAngle(){
		var rad = Math.PI / 180;
		var {center,radius,color, total, value,label} = this.props;
		
		var angle = value / total * 360;

		if(angle==0)  return { defaultPath: [], animatePath: [] };
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
	handleLoaded(path){
		var data = path.items;
		var percent = 0;
		var {easing} = this.props;
		easing = easing || function() { return 10;}
		var callAnimate = function(){
			if(percent<=100) {
				var animate = Raphael.animation({path: data[percent]}, easing(percent) , "linear",callAnimate);
				path.animate(animate);
			}
			percent ++;
		}
		callAnimate();
	}
	render(){
		var {width,height,background,center,radius,color,label} = this.props;
		var data = this.getPathDataByAngle();
		
		return (<Paper width={width} height={height}>
				<Circle x={center.x} y={center.y} r={radius} attr={{"fill": background, "stroke": "none"}} />
				<Path d={data.defaultPath} attr={{"fill": color, "stroke": "none"}} data={data.paths} load={this.handleLoaded.bind(this)}/>
                <Text x={center.x} y={center.y+radius/3} text={label} attr={{"fill": data.angle>180?"#fff": "#444"  , "stroke": "none"}} />
                {
                    this.props.children
                }
				</Paper>)
	}
}


PieChart.propTypes = { 
	width: React.PropTypes.number, 
	height: React.PropTypes.number,
	color: React.PropTypes.string, 
	background: React.PropTypes.string, 
	center: React.PropTypes.object, 
	value:  React.PropTypes.number,
    label: React.PropTypes.string,
    total: React.PropTypes.number,
    radius:  React.PropTypes.number
};
PieChart.defaultProps = { 
	color: "#74C93C",
	background: "#DDD",
	radius: 48,
	center: { x: 50,y: 50},
	label: "98%",
	value: 98,
	total: 100,
	width: 100,
	height: 100
};

module.exports = PieChart;