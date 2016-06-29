var sectors = d3.set();
var states = d3.set();
function draw(data) {
    "use strict";
    var dateFormat = d3.time.format("%Y-%m-%d");

    data.forEach(function(d) {
        d["period"] = dateFormat.parse(d["period"]);
        sectors.add(d['sector']);
        states.add(d['state']);
    });
    d3.select("h2")
        .text("Construction Work Completed");
    createLineChart(data);
    createBarChart(data);      
}

function createLineChart(data) {
    var margin = 75,
        width = 500 - margin,
        height = 500 - margin;
    var nested_data = d3.nest()
        .key(function(d) {
            return d['period'].getUTCFullYear();
        })
        .rollup(aggregate)
        .entries(data);

    var value_extent = d3.extent(nested_data, function(d){
        return d.values['value'];
    });
    var x_extent = d3.extent(nested_data, function(d){
        return d.key;
    });

    // scale functions
    var x_scale = d3.scale.linear()
      .range([margin, width])
      .domain(x_extent);

    var value_scale = d3.scale.linear()
      .range([height, margin])
      .domain(value_extent);

    var svg = d3.select("#chart1")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin)
            .append('g')


     var x_axis = d3.svg.axis()
      .scale(x_scale)
      .ticks(20)
      .tickFormat(d3.format("d"));

    var value_axis = d3.svg.axis()
      .scale(value_scale)
      .orient("left");


    
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', "translate(0," + height +")")
        .call(x_axis)
        .selectAll('text')
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    svg.append("text")             // text label for the x axis
        .attr("x", (width / 2) )
        .attr("y",  height + 50)
        .attr("dy", ".75em")
        .attr("class", "axis_title")
        .text("Year");

    
    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', "translate(" + margin +", 0)")
        .call(value_axis);


    var line = d3.svg.line()
        .x(function(d) { return x_scale(d.key); })
        .y(function(d) { return value_scale(d.values['value']); });

    svg.append("path")
      .datum(nested_data)
      .attr("class", "line")
      .attr("d", line);
}


function createBarChart(data) {
    var margin = {top: 75, right: 20, bottom: 75, left: 100},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var nested_data = d3.nest()
        .key(function(d) {
            return d['state'];
        })
        .rollup(aggregate)
        .entries(data);
   
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(states.values());

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");


    var yExtent = d3.extent(nested_data, function(d){
        return d.values['value'];
    });
    
    var yScale = d3.scale.linear()
        .range([height, 0])
        .domain(yExtent);
    
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    var svg = d3.select("#chart2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    svg.append("text")             // text label for the x axis
        .attr("x", (width / 2) )
        .attr("y",  height + 50)
        .attr("dy", ".75em")
        .attr("class", "axis_title")
        .text("State");


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    

    svg.selectAll(".bar")
        .data(nested_data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { 
            return xScale(d.key); 
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { 
            return yScale(d.values['value']); 
        })
        .attr("height", function(d) { 
            return height - yScale(d.values['value']); 
    });  
}

function aggregate(leaves) {
    var total = d3.sum(leaves, function(d) {
        return d['value'];
    });
    return {
        'value': total
    };
};