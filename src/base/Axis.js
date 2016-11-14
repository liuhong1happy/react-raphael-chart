const React = require('react');

class Axis extends React.Component{
    render(){
        var {Axis,yAxis,grid,type} = this.props;
        return (<Set>
            <XAxis xAxis={xAxis} type={type}/>        
            <YAxis yAxis={yAxis} type={type}/>
            <Grid grid={grid} type={type}/>
        </Set>)
    }
}
                
module.exports = Axis;