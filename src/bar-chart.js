const React = require('react');
const { Raphael, Paper, Set, Text, Rect,Path, Circle } = require('react-raphael');
const Axis = require('./base/Axis');
const Utils = require('./utils');

class BarSerise extends React.Component{
	getDefaultPath(){
		var { width,height,xAxis,yAxis} = this.props;
		return ["M",yAxis.width,height-xAxis.height+15,"L",width, height-xAxis.height+15 ];
	}
	getBarPath(){
        var data = this.getDrawPoints();
		var path = [];
		if(data.length>=1){
			path.push([ "M", data[0]._x, data[0]._y ]);
			for(var i=1;i<_data.length;i++){
				path.push(["L", data[i]._x, data[i]._y ]);
			}
		}else{
			path.push([ "M", data[0]._x || 0, data[0]._y || 0 ]);
		}
		return path;
	}
	getCurvePath(first){
        var data = this.getDrawPoints();
		var path = [];
		var controls = Utils.getControlPoint(data);
		var pathData = ["M"+first.x+","+first.y+"C"+first.x+","+first.y+" "+controls[0].x+","+controls[0].y+" "+data[1]._x+","+data[1]._y];
		for(var i=1;i<data.length-1;i++){
			if(i==data.length-2) {
				pathData.push("C"+controls[controls.length-1].x+","+controls[controls.length-1].y+" "+data[i+1]._x+","+data[i+1]._y+" "+data[i+1]._x+","+data[i+1]._y);
			}
			else {
				var control1 = controls[i*2-1], control2 = controls[i*2];
				pathData.push("C"+control1.x+","+control1.y+" "+control2.x+","+control2.y+" "+data[i+1]._x+","+data[i+1]._y);
			}
		}
		return pathData;
	}
    getDrawPoints(){
	   var { width,height,serise,xAxis,yAxis,index,count,barWidth,fontSize} = this.props;
		serise._index = index; 
		serise._count = count;
       var data = Utils.getBarData({width,height,xAxis,yAxis,barWidth,fontSize},serise);
       return data.Values;
    }
	handleMouseOut(){
		var data = this.items;
		this.attr({"fill": data.color});
		if(data.textAutoHide){
			this.set[1].hide();
		}else{
			this.set[1].attr({"fill": data.color});
		}
	}
	handleMouseOver(){
		var data = this.items;
		data.color = this.attr("fill");
		this.attr({"fill":data.hoverColor}).toFront();
		if(data.textAutoHide){
			this.set[1].show().toFront();
		}
		else{
			this.set[1].attr({"fill":data.hoverColor}).toFront();
		}
	}
    render(){
	    var {serise,height,xAxis,fontSize,textAutoHide} = this.props;
		serise.textAutoHide = textAutoHide;
		var data = this.getDrawPoints();
		var defaultY = height - xAxis.height + 15;
		var handleMouseOut = this.handleMouseOut;
		var handleMouseOver = this.handleMouseOver;
        return (<Set>
			{
				data.map(function(ele,pos){
					return (<Set key={pos}>
						<Rect key={"path"+pos} x={ele._x - ele._width/2} y={defaultY} width={ele._width} height={0} data={{...serise}}
							attr={{"fill": ele.color || serise.color,"stroke": "none"}} mouseout={handleMouseOut} mouseover={handleMouseOver}
							animate={Raphael.animation({"y":ele._y,"height":ele._height},500,"<>")} />
						<Text key={"text"-pos} x={ele._x} y={ele._y-fontSize/2} text={String(ele.y)} attr={{"fill": textAutoHide? serise.hoverColor : (ele.color || serise.color),"font-size": fontSize}} hide={textAutoHide}/>
						</Set>)
				})
			}
        </Set>)
    }
}

class BarChart extends React.Component{
    constructor(props){
        super(props);
    }
    getSerisePointsByIndex(index){
        var points = [];
		var { serises,width,height,xAxis,yAxis,barWidth,fontSize } = this.props;
		var serise = serises[index];
		serise._index = index; 
		serise._count = serises.length+1;
        var data = Utils.getBarData({width,height,xAxis,yAxis,barWidth,fontSize},serise);
        return data.Values;
    }
    getSeriseAllPoints(){
        var {serises} = this.props;
        var points = [];
        for(var i=0;i<serises.length;i++){
            points = points.concat(this.getSerisePointsByIndex(i));
        }
        return points;
    }
    render(){
        var {width,height,serises,xAxis,yAxis,grid,fontSize,barWidth,textAutoHide,children} = this.props;
        return (<Paper width={width} height={height}>
            <Axis type="bar" width={width} height={height} xAxis={xAxis} yAxis={yAxis} grid={grid} />
            {
                serises.map(function(ele,pos){
                    return (<BarSerise key={pos} ref={"serise"+pos} index={pos} count={serises.length+1} width={width} height={height} barWidth={barWidth} fontSize={fontSize}
							textAutoHide={textAutoHide} serise={ele} xAxis={xAxis} yAxis={yAxis} />)
                })
            }
            {
                children
            }
        </Paper>)
    }
}

BarChart.propTypes = { 
	width: React.PropTypes.number, 
	height: React.PropTypes.number,
	serises: React.PropTypes.arrayOf(React.PropTypes.object),
	xAxis: React.PropTypes.shape({
		min: React.PropTypes.number, 
		max: React.PropTypes.number, 
		interval: React.PropTypes.number, 
		formatter: React.PropTypes.func, 
		width: React.PropTypes.number, 
	}),
	yAxis: React.PropTypes.shape({
		min: React.PropTypes.number, 
		max: React.PropTypes.number, 
		interval: React.PropTypes.number, 
		formatter: React.PropTypes.func, 
		width: React.PropTypes.number, 
	}),
	grid:  React.PropTypes.shape({
		color: React.PropTypes.string, 
		thickness: React.PropTypes.number,
		showYGrid: React.PropTypes.bool,
		showXGrid: React.PropTypes.bool
	}),
	barWidth: React.PropTypes.number,
	fontSize: React.PropTypes.number,
	textAutoHide: React.PropTypes.bool
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
	grid:{
		color: "#ccc",
		thickness: 1,
		showYGrid: false,
		showXGrid: true
	},
	barWidth: 20,
	fontSize: 14,
	textAutoHide: false
};
                
module.exports = BarChart;