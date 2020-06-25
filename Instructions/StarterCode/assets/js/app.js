// @TODO: YOUR CODE HERE!
// canvas for a chart
var responsiveChart = null;

// SVG

var svgHeight = 1080
var svgWidth = 1920

// set margins

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

// chart area
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// SVG WRAPPER
var svg d3.select('#scatter').append("svg").attr("height", svgHeight).attr("width", svgWidth);

// Chart group def
var diagrammGrouppe = svg.append("g").attr("transform", 'translate(${margin.left}, ${margin.top})');

// csv load
d3.csv("/StarterCode/assets/data/data.csv").then(function(data) {
    // error-check
    console.log(data);

    //Data parsing
    data.forEach( d => {
        d.poverty = +d.poverty;
        d.age = +d.age;
        d.income = +d.income;
        d.obesity = +d.obesity;
        d.healthcare = +d.healthcare;
        d.smokes = +d.smokes;
    });

    var responsiveChart = data;
    var yData = data.obesity;
    var xData = data.poverty;
    
    // scale functions creation
    var yLinearScale = d3.scaleLinear().domain([d3.min(data, d => d.obesity) * 0.95, d3.max(data, d => d.obesity) * 1.05]).range([chartHeight, 0]);
    
    var xLinearScale = d3.scaleLinear().domain([d3.min(data, d => d.poverty) * 0.95,
            d3.max(data, d => d.poverty) * 1.05]).range([0, chartWidth]);
    
    // create axis functions
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to chart
    diagrammGrouppe.append("g").attr("transform", 'translate(0, ${chartHeight})').call(bottomAxis);

    diagrammGrouppe.append("g").call(leftAxis);

    var circlesLabels = diagrammGrouppe.selectAll("g circlesLabels").data(data).enter().append("g");

    circlesLabels.append("text").attr("x", d => xLinearScale(d.poverty) - 11).attr("y", d => yLinearScale(d.obesity) + 5).text(d => d.abbr);
    
    // CIRCLEs
    circlesLabels
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");
// circlesLabels
    // .append("circle")
    // .attr("cx", d => xLinearScale(d.poverty))
    // .attr("cy", d => yLinearScale(d.obesity))
    // .attr("r", "15")
    // .attr("fill", "blue")
    // .attr("opacity", ".5");
    
    // tool tip initialization
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([60, -60])
      .html(function(d) {
        return (`${d.state} <br>${d.poverty}: ${d[d.poverty]} <br>${d.obesity}: ${d[d.obesity]}`);
      });
    
    
    // tooltip 
    diagrammGrouppe.call(toolTip);

    // event listeners
    circlesLabels.on("click", function(data) {toolTip.show(data, this);
    })

    // onmouse
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
    });

    // append Chart Title
    diagrammGrouppe.append("text")
        .attr("x", (chartWidth / 2))
        .attr("y", (-30))
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obesity versus Poverty Rate");
        
        //xaxis
        diagrammGrouppe.append("text")
        .attr("x", (chartWidth / 2))
        .attr("y", (chartHeight + 30))
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Poverty Rate");
    
    // append y axis
    diagrammGrouppe.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (chartHeight / 2))
    .attr("y", 0 - margin.left)
    .attr("text-anchor", "middle")
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Rate of Obesity");
});




// function makeResponsive() {
//     var svgArea = d3.select("body").select("svg");
    
    
