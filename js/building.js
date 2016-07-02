var margin = {top: 75, right: 20, bottom: 0, left: 100},
        width = 650 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
var transitionDuration = 500;

function draw(data) {
    "use strict";
    function getNestedData(key, sectorFilter, stateFilter) {
        /* function to filter and then nest data based on the 
        key for each chart type
        */
        var filteredData = [];
        if (sectorFilter == 'All' && stateFilter == 'All') {
            filteredData = data;
        }
        else if (sectorFilter != 'All' && stateFilter == 'All') {
            filteredData = data.filter(function(d) {
                return d['sector'] === sectorFilter;
            });
        }
        else if (sectorFilter == 'All' && stateFilter != 'All') {
            filteredData = data.filter(function(d) {
                return d['state'] === stateFilter;
            });
        }
        else {
            filteredData = data.filter(function(d) {
                return d['state'] === stateFilter && d['sector'] === sectorFilter;
            });
        }
        return d3.nest()
            .key(function(d) {
                if (key == 'period') {
                    return d['period'].getUTCFullYear();    
                }
                else {
                    return d[key];
                }
            })
            .rollup(aggregate)
            .entries(filteredData);
    }

    function updateTitle(sector) {
        // updates title
        d3.select('h2')
        .text('Sector: '+ sector);
    }

    function formatValue(d) {
        var format = d3.format('0,000');
            d = format(d / 1e9) + ' B';
            return d;
    }



    var sectors = d3.set();
    var states = d3.set();
    var dateFormat = d3.time.format('%Y-%m-%d');
    data.forEach(function(d) {
        d['period'] = dateFormat.parse(d['period']);
        sectors.add(d['sector']);
        states.add(d['state']);
    });
    updateTitle('All')

    // get Nested Data for charts
    var lineData = getNestedData('period','All','All')
    var barData = getNestedData('state','All','All');


    // create Line Chart
    var lineXRange = d3.extent(lineData, function(d){
        return d.key;
    });
    // scale functions
    var lineXScale = d3.scale.linear()
      .range([margin.left, width])
      .domain(lineXRange);


    var lineXAxis = d3.svg.axis()
      .scale(lineXScale)
      .ticks(20)
      .tickFormat(d3.format('d'));


    var lineYRange = d3.extent(lineData, function(d){
        return d.values['value'];
    });
    
    var lineYScale = d3.scale.linear()
      .range([height, 0])
      .domain(lineYRange);


      
    var lineYAxis = d3.svg.axis()
      .scale(lineYScale)
      .orient('left')
      .tickFormat(formatValue);

    var svgLine = d3.select('#chart1')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g');

    svgLine.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height +')')
        .call(lineXAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)');

    svgLine.append('text')             // text label for the x axis
        .attr('x', (width / 2) )
        .attr('y',  height + 50)
        .attr('dy', '.75em')
        .attr('class', 'axis_title')
        .text('Year');

    svgLine.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + margin.left +', 0)')
        .call(lineYAxis);
    svgLine.append('text')             // text label for the y axis
        .attr('x', -100 )
        .attr('y',  15)
        .attr('class', 'axis_title')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .text('Value of work completed ($ Billion)');

    // returns coordinates for line used by the line chart
    var valueline = d3.svg.line()
        .x(function(d) { return lineXScale(d.key); })
        .y(function(d) { return lineYScale(d.values['value']); });

    
    
    svgLine.append('path')
        .attr('class', 'line')
        .attr('d', valueline(lineData));

    
    svgLine.append('rect')
        .attr('fill', 'red')
        .attr('opacity',0.5)
        .attr('x', lineXScale(2007))
        .attr('width', lineXScale(2009) - lineXScale(2007))
        .attr('y', 0)
        .attr('height', height);


    var legend = svgLine.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate('+ (600)+','+10+')');
    legend.append('rect')
        .attr('fill', 'red')
        .attr('opacity',0.5)
        .attr('width',20)
        .attr('x', -160)
        .attr('y', -15)
        .attr('height', 20);
    legend.append('text') 
        .style('text-anchor', 'end')
        .text('Global Financial Crisis');

    var xScale = d3.scale.ordinal()
        .rangeRoundBands([margin.left, width], .1)
        .domain(states.values());

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom');


    var yExtent = d3.extent(barData, function(d){
        return d.values['value'];
    });
    
    var yScale = d3.scale.linear()
        .range([height, 0])
        .domain(yExtent);
    
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .tickFormat(formatValue);

    var svgBar = d3.select('#chart2')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g');

    svgBar.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)');
    svgBar.append('text')             // text label for the x axis
        .attr('x', (width / 2) )
        .attr('y',  height + 50)
        .attr('dy', '.75em')
        .attr('class', 'axis_title')
        .text('State');


    svgBar.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .attr('transform', 'translate(' + margin.left +', 0)');
       
    svgBar.append('text')             // text label for the y axis
        .attr('x', -100 )
        .attr('y',  15)
        .attr('class', 'axis_title')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .text('Value of work completed ($ Billion)');

    svgBar.selectAll('.bar')
        .data(barData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { 
            return xScale(d.key); 
        })
        .attr('width', xScale.rangeBand())
        .attr('y', function(d) { 
            return yScale(d.values['value']); 
        })
        .attr('height', function(d) { 
            return height - yScale(d.values['value']); 
    });  


    // Add sectors to sector drop down box for filtering
    var sectorData = ['All']
    sectorData = sectorData.concat(sectors.values().sort());
    var sectorDropDown = d3.select('#selSector');
    sectorDropDown.on('change', function(d) {
        updateCharts();
    });
    sectorDropDown.selectAll('option')
        .data(sectorData)
        .enter()
        .append('option')
        .text(function(d) {
            return d;
        });

    // Add states to state drop down for filtering
    var stateData = ['All']
    stateData = stateData.concat(states.values().sort());
    var stateDropDown = d3.select('#selState');
    stateDropDown.on('change', function(d) {
        updateCharts();
    });
    stateDropDown.selectAll('option')
        .data(stateData)
        .enter()
        .append('option')
        .text(function(d) {
            return d;
        });

                        

    function updateCharts() {
        var sector = d3.select('#selSector').property('value');
        var state = d3.select('#selState').property('value');

        // update title
        updateTitle(sector)
        
        // update nested data sets
        lineData = getNestedData('period', sector, state);
        barData = getNestedData('state', sector, 'All');

        // Update line chart
        var lineXRange = d3.extent(lineData, function(d){
            return d.key;
        });
        lineXScale.domain(lineXRange);
        var lineYRange = d3.extent(lineData, function(d){
            return d.values['value'];
        });
        lineYScale.domain(lineYRange);
        svgLine.select('.line')
            .transition()
            .duration(transitionDuration)
            .attr('d', valueline(lineData));
        
        svgLine.select('.y.axis') // change the y axis
            .transition()
            .duration(transitionDuration)
            .call(lineYAxis);
        
        
        // update bar chart

        yExtent = d3.extent(barData, function(d){
            return d.values['value'];
        });
        yScale.domain(yExtent);

        svgBar.selectAll('rect')
            .data(barData)
            .transition()
            .duration(transitionDuration)
        .attr('y', function(d) { 
            return yScale(d.values['value']); 
        })
        .attr('height', function(d) { 
            return height - yScale(d.values['value']); 
        });
        svgBar.select('.y.axis') // change the y axis
            .transition()
            .duration(500)
            .call(yAxis);
    }


}




function aggregate(leaves) {
    var total = d3.sum(leaves, function(d) {
        return d['value'];
    });
    return {
        'value': total
    };
};