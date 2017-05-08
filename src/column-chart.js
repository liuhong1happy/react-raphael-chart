const React = require('react');
const { Raphael, Paper, Set, Text, Rect,Path, Circle } = require('react-raphael');
const Axis = require('./base/Axis');
const Utils = require('./utils');

const { Component, PropTypes } = React;

class ColumnSerise extends Component{
	getDefaultPath(){
		var { width,height,xAxis,yAxis} = this.props;
		return ["M",yAxis.width,height-xAxis.height+15,"L",width, height-xAxis.height+15 ];
	}
	getColumnPath(){
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
    getDrawPoints(){
	   var { width,height,serise,xAxis,yAxis,index,count,barWidth,fontSize} = this.props;
		serise._index = index; 
		serise._count = count;
       var data = Utils.getColumnData({width,height,xAxis,yAxis,barWidth,fontSize},serise);
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

class ColumnChart extends Component{
    render(){
        var {width,height,serises,xAxis,yAxis,grid,fontSize,barWidth,textAutoHide,children} = this.props;
        return (<Paper width={width} height={height}>
            <Axis type="column" width={width} height={height} xAxis={xAxis} yAxis={yAxis} grid={grid} />
            {
                serises.map(function(ele,pos){
                    return (<ColumnSerise key={pos} ref={"serise"+pos} index={pos} count={serises.length+1} width={width} height={height} barWidth={barWidth} fontSize={fontSize}
							textAutoHide={textAutoHide} serise={ele} xAxis={xAxis} yAxis={yAxis} />)
                })
            }
            {
                children
            }
        </Paper>)
    }
}

ColumnChart.propTypes = { 
	width: PropTypes.number, 
	height: PropTypes.number,
	serises: PropTypes.arrayOf(PropTypes.object),
	xAxis: PropTypes.shape({
		min: PropTypes.number, 
		max: PropTypes.number, 
		interval: PropTypes.number, 
		formatter: PropTypes.func, 
		width: PropTypes.number, 
	}),
	yAxis: PropTypes.shape({
		min: PropTypes.number, 
		max: PropTypes.number, 
		interval: PropTypes.number, 
		formatter: PropTypes.func, 
		width: PropTypes.number, 
	}),
	grid:  PropTypes.shape({
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
                
module.exports = ColumnChart;