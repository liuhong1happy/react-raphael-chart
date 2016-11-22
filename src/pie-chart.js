const React = require('react');
const { Raphael, Paper, Set, Text, Rect,Path, Circle } = require('react-raphael');

class PieChart extends React.Component{
	constructor(props){
		super(props);
		this.repeatCount = 0;
	}
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
	handleLoaded(path){
		var data = path.items;
		var percent = 0;
		var { easing, animate, repeat } = this.props;
		easing = easing || function() { return 10;}
		var callAnimate = function(){
			
			if(percent<=100) {
				var animate = Raphael.animation({path: data[percent]}, easing(percent) , "linear",callAnimate);
				path.animate(animate);
			}
			percent ++;
		}
		
		if(data.length==101){
			if(!animate) return false;
			if(!repeat && this.repeatCount>=1) {
				percent=100;
				path.attr({path: data[percent]});
				this.repeatCount ++;
			}else{
				path.stop();
				callAnimate();
				this.repeatCount ++;
			}
		} 
	}
	render(){
		var {width,height,background,center,radius,color,label,position,fontsize, style,className,children,...others} = this.props;
		var data = this.getPathDataByAngle();
		var textPosition = { x: position ? position.x : center.x, y: position ? position.y : center.y+radius/3}
		return (<Paper width={width} height={height} container={{ "style": style, "className": className || "pie-chart",...others}}>
				<Circle x={center.x} y={center.y} r={radius} attr={{"fill": background, "stroke": "none"}} />
				<Path d={data.defaultPath} attr={{"fill": color, "stroke": "none"}} data={data.paths} load={this.handleLoaded.bind(this)} update={this.handleLoaded.bind(this)}/>
                <Text x={textPosition.x} y={textPosition.y} text={label} attr={{"fill": data.angle>180?"#fff": "#444" ,"font-size": fontsize || 10 , "stroke": "none"}} />
                {
                    children
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
    radius:  React.PropTypes.number,
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
	center: { x: 50,y: 50},
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