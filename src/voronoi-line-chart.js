const Voronoi = require('voronoi');
const React = require('react');
const LineChart = require('./line-chart');
const { Set, Text, Path, Circle } = require('react-raphael');

class Cell extends React.Component{
	handleMouseOver(){
		this.set[0][0].show();
		this.set.toFront();
	}
	handleMouseOut(){
		this.set[0][0].hide();
//		this.set.toBack();
	}
	render(){
		var {site,halfedges} = this.props.data;
		var { label, color } = this.props;
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
				<Text x={site.x} y={site.y} text={String(site.v)} attr={{"fill": color}} hide={true} translate={{x:0,y: 10}}/>
				<Circle x={site.x} y={site.y} r={3} attr={{"fill":color,"stroke":"#fff"}} />
			</Set>
			<Path d={path} attr={{"fill":"none","stroke":"none"}}  mouseover={this.handleMouseOver} mouseout={this.handleMouseOut}/>
		</Set>)
	}
}

class VoronoiLineChart extends React.Component{
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
				y: data[i]._y,
				v: data[i]._label,
				color: data[i].color
			})
		}
		var voronoi = new Voronoi();
		var bbox = {xl: 44, xr: 501, yt: 14, yb: 316}; 
		var diagram = voronoi.compute(points, bbox);

		this.setState({
			result: diagram
		})
    }
    render(){
		var cells = this.state.result.cells || [];
        return (<LineChart ref="chart" {...this.props}>
                {
					cells.map(function(ele,pos){
						return (<Cell key={pos} data={ele} label={"test"} color={ ele.site.color }/>)
					})
				}
            </LineChart>)
    }
}

module.exports = VoronoiLineChart;