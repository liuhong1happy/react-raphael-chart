# react-raphael-chart

[![Version](https://img.shields.io/npm/v/react-raphael-chart.svg)](https://www.npmjs.com/package/react-raphael-chart)
[![Downloads](https://img.shields.io/npm/dt/react-raphael-chart.svg)](https://www.npmjs.com/package/react-raphael-chart)

so easy, create charts with react-raphael!

## Install

	# or specify the externals in webpack config
	npm install --save raphael
	# install react-raphael-chart in your react-raphael-chart project
	npm install  --save react-raphael-chart

## API

#### PieChart

**All props**

- color `string` arc fill color of PieChart
- background `string` background fill color of PieChart
- radius `number` radius of PieChart's circle
- center `object` radius of PieChart's circle
- label `number` text of PieChart's label
- fontsize `object` fontsize of PieChart's label
- total `string` total of PieChart's data
- value `number` value of PieChart's data
- width `number` width of PieChart
- height `number` width of PieChart
- style `object` style of PieChart's container
- className `string` className of PieChart's container
- animate `boolean` animation of PieChart
- repeat `boolean` repeat the animation

#### DoughnutChart

**All props**

- color `string` arc fill color of DoughnutChart
- background `string` background fill color of DoughnutChart
- radius `number` radius of DoughnutChart's circle
- center `object` radius of DoughnutChart's circle
- thinckness `number` thinckness of DoughnutChart's circle
- label `number` text of DoughnutChart's label
- fontsize `object` fontsize of DoughnutChart's label
- total `string` total of DoughnutChart's data
- value `number` value of DoughnutChart's data
- width `number` width of DoughnutChart
- height `number` width of DoughnutChart
- style `object` style of DoughnutChart's container
- className `string` className of DoughnutChart's container
- animate `boolean` animation of DoughnutChart
- repeat `boolean` repeat the animation

#### LineChart ( VoronoiLineChart )

- width `number` width of LineChart
- height `number` width of LineChart
- serises `array` serises of LineChart
	- data `array` data of LineChart's serise
		- x `number` x of LineChart's serise data
		- y `number` x of LineChart's serise data
	- color `string` color of LineChart's serise
	- thickness `number` thickness of LineChart's serise
	- curve `boolean` curve of LineChart's serise
- xAxis `object` xAxis of LineChart
	- min `number` min value of xAxis
	- max `number` max value of xAxis
	- interval `number` interval value of xAxis
	- formatter `function` title formatter of xAxis `{ data: object }`
	- height `number` height of xAxis
- yAxis `object` yAxis of LineChart
	- min `number` min value of yAxis
	- max `number` max value of yAxis
	- interval `number` interval value of yAxis
	- formatter `function` title formatter of yAxis `{ data: object }`
	- width `number` width of yAxis
- grid `object` grid of LineChart
	- color `string` color of LineChart's grid
	- thickness `number` thickness of LineChart's serise
	- showYGrid `boolean` show y axis grid of LineChart
	- showXGrid `boolean` show y axis grid of LineChart
- animate `boolean` animation of LineChart
- repeat `boolean` repeat the LineChart

#### BarChart

- width `number` width of BarChart
- height `number` width of BarChart
- serises `array` serises of BarChart
	- data `array` data of BarChart's serise
		- x `number` x of BarChart's serise data
		- y `number` x of BarChart's serise data
	- color `string` color of BarChart's serise
	- hoverColor `string` hover color of BarChart's serise
- xAxis `object` xAxis of BarChart
	- min `number` min value of xAxis
	- max `number` max value of xAxis
	- interval `number` interval value of xAxis
	- formatter `function` title formatter of xAxis `{ data: object }`
	- height `number` height of xAxis
- yAxis `object` yAxis of BarChart
	- min `number` min value of yAxis
	- max `number` max value of yAxis
	- interval `number` interval value of yAxis
	- formatter `function` title formatter of yAxis `{ data: object }`
	- width `number` width of yAxis
- grid `object` grid of BarChart
	- color `string` color of BarChart's grid
	- thickness `number` thickness of BarChart's serise
	- showYGrid `boolean` show y axis grid of BarChart
	- showXGrid `boolean` show y axis grid of BarChart
- barWidth `number` max width of BarChart's bar
- fontSize `number` font size of BarChart's text
- textAutoHide  `boolean` auto hide of BarChart's text


## Develop

1. clone the repository

        git clone https://github.com/liuhong1happy/react-raphael-chart.git
    
2. install dependency package;

        npm install 

3. run example

        npm run example
        
4. build

        npm run build
        
## Use

Now , you can see [example](example/index.js) !


# Contact

Email: [liuhong1.happy@163.com](mailto:liuhong1.happy@163.com)
