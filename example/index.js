require('./index.less');
var React = require('react');
var ReactDOM = require('react-dom');
var {LineChart,BarChart,PieChart,DoughnutChart} = require('../lib/index');
var Voronoi = require('voronoi');
const { Raphael, Paper, Set, Text, Rect,Path, Circle } = require('react-raphael');

var lineSerise = {
	color: "#74C93C",
	thickness: 2,
	data: [{x:0,y:90},{x:1,y:83},{x:2,y:80},{x:3,y:45},{x:4,y:82},{x:5,y:75},{x:6,y:95},{x:7,y:100},{x:8,y:98},{x:9,y:92},{x:10,y:94}]
}

var barSerise = {
	color: "#74C93C",
	thickness: 2,
	data: [{x:1,y:83},{x:2,y:80},{x:3,y:45},{x:4,y:82},{x:5,y:75},{x:6,y:95},{x:7,y:100},{x:8,y:98},{x:9,y:92},{x:10,y:94}]
}

var pieSerise = {
	color: "#74C93C",
	background: "#DDD",
	radius: 48,
	center: { x: 50,y: 50},
	label: "0%",
	value: 0,
	total: 100,
	width: 100,
	height: 100
}

const SampleLineChart = ()=> <LineChart width={500} height={360} serises={[lineSerise]} />;
const SampleBarChart = ()=> <BarChart width={500} height={360} serises={[barSerise]} />;
const SamplePieChart = () => <PieChart {...pieSerise} />;
const SampleDoughnutChart = () => <DoughnutChart {...pieSerise} />;

class Cell extends React.Component{
	handleMouseOver(){
		this.set[0].show();
		//this.attr({"stroke":"#000"});
	}
	handleMouseOut(){
		this.set[0].hide();
		//this.attr({"stroke":"none"});
	}
	render(){
		var {site,halfedges} = this.props.data;
		var label = this.props.label;
		var path = [];
		for(var i=0;i<halfedges.length;i++){
			var {va,vb,lSite} = halfedges[i].edge;
			if(i==0) path.push(["M",va.x,va.y ]);
			else if(i==halfedges.length-1){
				if(site.x == lSite.x && site.y == lSite.y)
					path.push(["L",va.x,va.y,"L",vb.x,vb.y,"Z" ]);
				else
					path.push(["L",vb.x,vb.y,"L",va.x,va.y,"Z" ]);
			}else{
				if(site.x == lSite.x && site.y == lSite.y)
					path.push(["L",va.x,va.y ]);
				else
					path.push(["L",vb.x,vb.y ]);
			}
		}
		
		return (<Set>
			<Set>
				<Text x={site.x} y={site.y} text={label} hide={true} translate={{x:0,y: 10}}/>
				<Circle x={site.x} y={site.y} r={3} attr={{"fill":"#000"}} hide={true}/>
			</Set>
			<Path d={path} attr={{"fill":"none","stroke":"none"}}  mouseover={this.handleMouseOver} mouseout={this.handleMouseOut}/>
		</Set>)
	}
}

class ExtendLineChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            result: {}
        }
    }
    componentDidMount(){
        var data = this.refs.chart.getSeriseAllPoints();
		var points = [];
		for(var i=0;i<data.length;i++){
			points.push({
				x: data[i]._x,
				y: data[i]._y
			})
		}
		var voronoi = new Voronoi();
		var bbox = {xl: 59, xr: 501, yt: 14, yb: 316}; 
		var diagram = voronoi.compute(points, bbox);
		
		console.log(diagram);
		
		this.setState({
			result: diagram
		})
    }
    render(){
		var cells = this.state.result.cells || [];
        return (<LineChart ref="chart" width={500} height={360} serises={[lineSerise]}>
                {
					cells.map(function(ele,pos){
						return (<Cell key={pos} data={ele} label={"test"}/>)
					})
				}
            </LineChart>)
    }
}

ReactDOM.render(<div>
                <SampleLineChart />
                <ExtendLineChart />
				<SampleBarChart />
				<SamplePieChart />
                <SampleDoughnutChart />
                </div>,document.getElementById("react-container"));