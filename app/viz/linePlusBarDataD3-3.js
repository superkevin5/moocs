$(document).ready(function () {


    var LABELS = null;
    var VALUE1 = null;
    var VALUE2 = null;
    var y1dataset = [0, 2, 4, 6, 8];
    var y2dataset = [0, 5, 10, 15, 20, 25];

    $("#create_chart").click(function () {
        var labelStr = $('#labels').val().trim();
        var value1Str = $('#value1').val().trim();
        var value2Str = $('#value2').val().trim();

        if (!/^(\w+)$|^(\s*\w+\s*,\s*)+\w+$/g.test(labelStr)) {
            $('#labels').parent().addClass('has-error');
            $('.indication').show();
            return;
        }
        $('#labels').parent().removeClass('has-error').addClass('has-success');
        if (!/^(\d+)$|^(\s*\d+\s*,\s*)+\d+$/g.test(value1Str)) {
            $('#value1').parent().addClass('has-error');
            $('.indication').show();
            return;
        }
        $('#value1').parent().removeClass('has-error').addClass('has-success');
        if (!/^(\d+)$|^(\s*\d+\s*,\s*)+\d+$/g.test(value2Str)) {
            $('#value2').parent().addClass('has-error');
            $('.indication').show();
            return;
        }
        $('#value2').parent().removeClass('has-error').addClass('has-success');
        resetError();

        LABELS = labelStr.split(',');
        VALUE1 = value1Str.split(',');
        VALUE2 = value2Str.split(',');

        if (Math.min(LABELS.length, VALUE1.length, VALUE2.length) !== Math.max(LABELS.length, VALUE1.length, VALUE2.length)) {
            $('.indication2').show();
            $('#value2').parent().addClass('has-error');
            $('#value1').parent().addClass('has-error');
            $('#labels').parent().addClass('has-error');
            return;
        }
        resetError();
        trimElements(LABELS, false);
        trimElements(VALUE1, true);
        trimElements(VALUE2, true);


        if (!isLabelUnique(LABELS)) {
            $('.indication4').show();
            return;
        }

        if (isElementValid(VALUE1, y1dataset) && isElementValid(VALUE2, y2dataset)) {
            resetError();
            create_chart(LABELS, VALUE1, VALUE2);
        } else {
            $('#value2').parent().addClass('has-error');
            $('#value1').parent().addClass('has-error');
            $('#labels').parent().addClass('has-error');
            $('.indication3').show();
        }
    });

    //var labels =
    var resetError = function () {
        $('.indication').hide();
        $('.indication2').hide();
        $('.indication3').hide();
    };

    var isLabelUnique = function (array) {
        var arrTmp = array.filter(function (v, i, a) {
            return a.indexOf(v) == i
        });

        if (array.length !== arrTmp.length) {
            return false;
        } else {
            return true;
        }
    };

    var trimElements = function (array, isNumber) {
        for (var i = 0; i < array.length; i++) {
            if (isNumber) {
                array[i] = parseInt(array[i].trim());
            }
            else {
                array[i] = array[i].trim();
            }
        }
    };

    var isElementValid = function (array, yAxis) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] > Math.max.apply(null, yAxis)) {
                return false;
            }
        }
        return true;
    };


    var create_chart = function (LABELS, VALUE1, VALUE2) {
        $("#chart").empty();
        console.log('chart create in progress');
        var width = 1200;
        var height = 600;
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "85%")
            .attr("viewBox", "0 0 " + width + " " + (height + 70))
            .attr("preserveAspectRatio", "xMinYMid meet");

        //var xdataset = ["Contributor", "Investor", "Funder", "StakeHolder", "Entrepreneur"];
        var xdataset = LABELS;
        var map = {};

        for (var i = 0; i < LABELS.length; i++) {
            var ele = LABELS[i];
            map[ele] = {value1: VALUE1[i], value2: VALUE2[i]};
        }

        //
        //map["Contributor"] = {value1: 2, value2: 2};
        //map["Investor"] = {value1: 6, value2: 8};
        //map["Funder"] = {value1: 6, value2: 12};
        //map["StakeHolder"] = {value1: 8, value2: 20};
        //map["Entrepreneur"] = {value1: 8, value2: 22};
        //var y1dataset = [0, 2, 4, 6, 8];
        //var y2dataset = [0, 5, 10, 15, 20, 25];
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
            .attr("cursor", "pointer")
            .attr("fill", "steelblue")
            .on("mouseover", function (d, i) {
                showData(this, d);
            })
            .on("mouseout", function (d, i) {
                hideData();
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
                //showData(this, d);
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
            });

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "larger")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");


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
            .attr("transform", "translate(" + (width / 2) + "," + (height + 50) + ")") // centre below axis
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

        svg.append("foreignObject")
            .attr("width", 180)
            .attr("height", 100)
            .attr("id", "note")
            .attr("display", "none")
            .style("font", "10px 'Helvetica Neue'");

        var showData = function (obj, d) {
            var coord = d3.mouse(obj);
            var infobox = d3.select("#note");
            var v2 = map[d].value2;
            console.log(coord);
            infobox.attr("x", coord[0]);
            infobox.attr("y", coord[1] + 100);
            infobox.attr("display", "block");
            infobox.html("<div class='infobox'>Completed Activity : " + d + ' <br>' + "Cumulative Change :" + v2 + "</div>");
        };


        var hideData = function () {
            var infobox = d3.select("#note");
            infobox.attr("display", "none")
        };

    };


    create_chart(LABELS, VALUE1, VALUE2);
});
