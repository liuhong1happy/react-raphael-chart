const React = require('react');
const { Raphael, Paper, Set, Text, Rect,Path } = require('react-raphael');
const Axis = require('./base/Axis');
const Utils = require('./utils');

class LineSerise extends React.Component{
    render(){
        var { width,height,data,xAxis,yAxis} = this.props;
        var _data = Utils.getLineData({width,height,xAxis,yAxis},data);
        return (<Set>
            {
                data.map(function(ele,pos){
                    
                })
            }   
        </Set>)
    }
}

class LineChart extends React.Component{
    render(){
        var {width,height,data,xAxis,yAxis,grid} = this.props;
        return (<Paper width={width} height={height}>
            <Axis xAxis={xAxis} yAxis={yAxis} grid={grid}/>
            {
                data.map(function(ele,pos){
                    return (<LineSerise width={width} height={height} data={ele} xAxis={xAxis} yAxis={yAxis}/>)
                })
            }
        </Paper>)
    }
}

LineChart.propTypes = { width: React.PropTypes.number, height: React.PropTypes.number };
LineChart.defaultProps = { width: 600, height: 400 };
                
module.exports = LineChart;