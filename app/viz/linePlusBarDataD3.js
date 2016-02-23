var width = 1200;
var height = 600;


var svg = d3.select("#chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "65%")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMid meet")
    .style("border", "solid 1px");


var xdataset = ["A1", "A2", "A3", "A4", "A5"];
var map = {};
map["A1"] = {value1: 2, value2: 2};
map["A2"] = {value1: 6, value2: 8};
map["A3"] = {value1: 6, value2: 12};
map["A4"] = {value1: 8, value2: 20};
map["A5"] = {value1: 8, value2: 22};

var y1dataset = [0, 2, 4, 6, 8];
var y2dataset = [0, 5, 10, 15, 20, 25];
var padding = {left: 60, right: 60, top: 60, bottom: 50};
var xScale = d3.scale.ordinal()
    .domain(xdataset)
    .rangeRoundBands([0, width - padding.left - padding.right]);

var y1Scale = d3.scale.linear()
    .domain([0, d3.max(y1dataset)])
    .range([height - padding.top - padding.bottom, 0]);

var y2Scale = d3.scale.linear()
    .domain([0, d3.max(y2dataset)])
    .range([height - padding.top - padding.bottom, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");


var y1Axis = d3.svg.axis()
    .scale(y1Scale)
    .orient("left");


var y2Axis = d3.svg.axis()
    .scale(y2Scale)
    .orient("right");

var rectPadding = 60;

var rects = svg.selectAll(".MyRect")
    .data(xdataset)
    .enter()
    .append("rect")
    .attr("class", "MyRect")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function (d, i) {
        return xScale(d) + rectPadding / 2;
    })
    .attr("y", function (d) {

        var v1 = map[d].value1;
        return y1Scale(v1);
    })
    .attr("width", xScale.rangeBand() - rectPadding)
    .attr("height", function (d) {
        var v1 = map[d].value1;
        return height - padding.top - padding.bottom - y1Scale(v1);
    })
    .attr("fill", "steelblue")
    .on("mouseover", function (d, i) {
        // d3.select(this)
        //     .attr("fill", "yellow");
    })
    .on("mouseout", function (d, i) {
        d3.select(this)
            .transition()
            .duration(500)
            .attr("fill", "steelblue");
    });


svg.selectAll("circle")
    .data(xdataset)
    .enter().append("circle")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("fill", "red")
    .attr("cursor", "pointer")
    .attr("r", 5)
    .attr("cx", function (d) {
        return xScale(d) + rectPadding / 2 + (xScale.rangeBand() - rectPadding) / 2;
    })
    .attr("cy", function (d) {
        var v2 = map[d].value2;
        return y2Scale(v2);
    })
    .on("mouseover", function (d) {
        showData(this, d);
    })
    .on("mouseout", function () {
        hideData();
    });

var line = d3.svg.line()
    .x(function (d, i) {
        return xScale(d) + rectPadding / 2 + (xScale.rangeBand() - rectPadding) / 2;
    })
    .y(function (d) {
        var v2 = map[d].value2;
        return y2Scale(v2);
        ;
    });

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
    .call(xAxis);


svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .call(y1Axis);


svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + (width - padding.left) + "," + padding.top + ")")
    .call(y2Axis);

svg.append("path")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("d", line(xdataset)).attr("stroke", "red").attr("stroke", "red").attr("stroke-width", "2").attr("fill", "none");


svg.append("text")
    .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate(" + (width / 2) + "," + (height - (padding.bottom / 4)) + ")") // centre below axis
    .text("Completed Activities");


svg.append("text")
    .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate(" + (padding.left / 2) + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
    .text("Change Per Activity");

svg.append("text")
    .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate(" + (width - padding.left / 4) + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
    .text("Cumulative Change");

svg.append("circle")
    .attr("fill", "red")
    .attr("r", 5)
    .attr("transform", "translate(" + (width - padding.left / 4 - 5) + "," + ((height / 2) + 100) + ")") // text is drawn off the screen top left, move down and out and rotate


svg.append("rect")
    .attr("fill", "steelblue")
    .attr("transform", "translate(" + (padding.left / 2 - 10) + "," + (height / 2 + 110) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
    .attr("rx", 2)
    .attr("ry", 2)
    .attr("width", 10)
    .attr("height", 10);


function showData(obj, d) {
    var coord = d3.mouse(obj);
    var infobox = d3.select(".infobox");
    var v2 = map[d].value2;
    // return xScale(d) + rectPadding / 2 + (xScale.rangeBand() - rectPadding) / 2;
    // return y2Scale(v2);
    // now we just position the infobox roughly where our mouse is

    console.log(coord);


    var v2 = map[d].value2;
        //y2Scale(v2);

//.attr("transform", "translate(" + padding.left + "," + padding.top + ")")

    infobox.style("left", padding.left+xScale(d) + rectPadding / 2 + (xScale.rangeBand() - rectPadding) / 2);
    infobox.style("top",  padding.top+( y2Scale(v2)));
    $(".infobox").html("Completed Activity : " + d + ' <br> ' + "Cumulative Change :" + v2);
    $(".infobox").show();
}


function hideData() {
    $(".infobox").hide();
}


//$("#chart").append("<div class='infobox' style='display:none'>Test</div>");
