require('./index.less');
var React = require('react');
var ReactDOM = require('react-dom');
var {LineChart} = require('../lib/index');
var Voronoi = require('voronoi');

var lineSerise = {
	color: "#74C93C",
	thickness: 2,
	data: [{x:0,y:90},{x:1,y:83},{x:2,y:80},{x:3,y:87},{x:4,y:82},{x:5,y:75},{x:6,y:95},{x:7,y:100},{x:8,y:98},{x:9,y:92},{x:10,y:94}]
}


const SampleLineChart = ()=> <LineChart width={500} height={360} serises={[lineSerise]} />;
class VoronoiDiagram extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            result: {}
        }
    }
    componentDidMount(){
        this.handleLoaded = this.handleLoaded.bind(this);
    }
    handleLoaded(points){
        var sites = [];
        for(var i=0;i<points.length;i++){
            sites.push({
                x: points[i]._x,
                y: points[i]._y
            })
        }
        var bbox = {xl:60, xr:500, yt:15, yb:315};
        var voronoi = new Voronoi();
        var result = voronoi.compute(sites, bbox);
        console.log(result);
        this.setState({
            result: result
        })
    }
    render(){
        return (<LineChart width={500} height={360} serises={[lineSerise]}>
                
            </LineChart>)
    }
}

ReactDOM.render(<div>
                <SampleLineChart />
                <VoronoiDiagram />
                </div>,document.getElementById("react-container"));