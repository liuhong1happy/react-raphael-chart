const React = require('react');
const Utils = require('../utils');
const { Path,Set,Text } = require('react-raphael')

class Line extends React.Component{
	render(){
		var {x1,x2,y1,y2,...others} = this.props;
		return <Path d={[ "M",x1,y1, "L",x2,y2 ]} {...others} />
	}
}

class Grid extends React.Component{
	render(){
		var {xMin,xMax,yMin,yMax,xValues,yValues} = this.props.data;
		var {color,thickness,showYGrid,showXGrid} = this.props.grid;
		if(!showXGrid) yValues = [];
		if(!showYGrid) xValues = [];
		return (<Set>
			{
				xValues.map(function(ele,pos){
					return (<Line x1={ele.x} y1={yMin} x2={ele.x} y2={yMax} attr={{"stroke":color,"stroke-width":thickness}}/>)
				})
			}
			{
				yValues.map(function(ele,pos){
					return (<Line x1={xMin} y1={ele.y} x2={xMax} y2={ele.y} attr={{"stroke":color,"stroke-width":thickness}}/>)
				})
			}
		</Set>)
	}
}

class YAxis extends React.Component{
	render(){
		var yValues = this.props.yValues;
		var {color,thickness} = this.props.grid;
		return (<Set>
			{
				yValues.map(function(ele,pos){
					return (<Line x1={ele.x1} y1={ele.y} x2={ele.x2} y2={ele.y} attr={{"stroke":color,"stroke-width":thickness}}/>)
				})
			}
			{
				yValues.map(function(ele,pos){
					return (<Text x={ele.x1-12} y={ele.y} text={ele.label} attr={{"fill":ele.color,"text-anchor":"end","font-size": 14}} />)
				})
			}
		</Set>)				
	}
}

class XAxis extends React.Component{
	render(){
		var xValues = this.props.xValues;
		var {color,thickness} = this.props.grid;
		return (<Set>
			{
				xValues.map(function(ele,pos){
					return (<Line x1={ele.x} y1={ele.y1} x2={ele.x} y2={ele.y2} attr={{"stroke":color,"stroke-width":thickness}}/>)
				})
			}
			{
				xValues.map(function(ele,pos){
					return (<Text x={ele.x} y={ele.y2 + 12} text={ele.label} attr={{"fill":ele.color,"font-size": 14}}/>)
				})
			}
		</Set>)
	}
}

class Axis extends React.Component{
    render(){
        var { width,height,xAxis,yAxis,grid} = this.props;
        var data = Utils.getAxisData({width,height,xAxis,yAxis});
		
        return (<Set>
            <XAxis xValues={data.xValues} grid={grid} />        
            <YAxis yValues={data.yValues} grid={grid} />
            <Grid grid={grid} data={data} />
        </Set>)
    }
}
                
module.exports = Axis;