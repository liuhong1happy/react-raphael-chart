require('./index.less');
var React = require('react');
var ReactDOM = require('react-dom');
var {LineChart} = require('../lib/index');

var lineSerise = {
	color: "#74C93C",
	thickness: 2,
	data: [{x:0,y:90},{x:1,y:83},{x:2,y:80},{x:3,y:87},{x:4,y:82},{x:5,y:75},{x:6,y:95},{x:7,y:100},{x:8,y:98},{x:9,y:92},{x:10,y:94}]
}

ReactDOM.render(<LineChart width={1200} height={560} serises={[lineSerise]} />,document.getElementById("react-container"));