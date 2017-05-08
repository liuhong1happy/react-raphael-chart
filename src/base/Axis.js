const React = require('react');
const Utils = require('../utils');
const { Path,Set,Text, Line } = require('react-raphael')

class Grid extends React.Component{
	render(){
		var {xMin,xMax,yMin,yMax,xValues,yValues} = this.props.data;
		var {color,thickness,showYGrid,showXGrid} = this.props.grid;
		if(!showXGrid) yValues = [];
		if(!showYGrid) xValues = [];
		return (<Set>
			{
				xValues.map(function(ele,pos){
					return (<Line key={pos} x1={ele.x} y1={yMin} x2={ele.x} y2={yMax} attr={{"stroke":color,"stroke-width":thickness}}/>)
				})
			}
			{
				yValues.map(function(ele,pos){
					return (<Line key={pos} x1={xMin} y1={ele.y} x2={xMax} y2={ele.y} attr={{"stroke":color,"stroke-width":thickness}}/>)
				})
			}
		</Set>)
	}
}

class YAxis extends React.Component{
	render(){
		var yValues = this.props.yValues;
		var {color,thickness} = this.props.grid;
		var type = this.props.type;
		return (<Set>
			{
				yValues.map(function(ele,pos){
					return (<Line key={pos} x1={ele.x1} y1={ele.y} x2={ele.x2} y2={ele.y} attr={{"stroke":color,"stroke-width":thickness}}/>)
				})
			}
			{
				yValues.map(function(ele,pos){
					var y = ele.y;
					if(type=="bar") y = ele.y + ele.interval /2;
					return (<Text key={pos} x={ele.x1-12} y={y} text={String(ele.label)} attr={{"fill":ele.color,"text-anchor":"end","font-size": 12}} />)
				})
			}
		</Set>)				
	}
}

class XAxis extends React.Component{
	render(){
		var xValues = this.props.xValues;
		var {color,thickness} = this.props.grid;
		var type = this.props.type;
		return (<Set>
			{
				xValues.map(function(ele,pos){
					return (<Line key={pos} x1={ele.x} y1={ele.y1} x2={ele.x} y2={ele.y2} attr={{"stroke":color,"stroke-width":thickness}}/>)
				})
			}
			{
				xValues.map(function(ele,pos){
					var x = ele.x;
					if(type=="column") x = ele.x + ele.interval /2;
					return (<Text key={pos} x={x} y={ele.y2 + 12} text={String(ele.label)} attr={{"fill":ele.color,"font-size": 12}}/>)
				})
			}
		</Set>)
	}
}

class Axis extends React.Component{
    render(){
        var { width, height, xAxis, yAxis, grid, type} = this.props;
        var data = Utils.getAxisData({width,height,xAxis,yAxis,type});
		
        return (<Set>
            <XAxis xValues={data.xValues} grid={grid} type={type} />        
            <YAxis yValues={data.yValues} grid={grid} type={type} />
            <Grid grid={grid} data={data} />
        </Set>)
    }
}
                
module.exports = Axis;