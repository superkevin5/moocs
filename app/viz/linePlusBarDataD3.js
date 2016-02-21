    var width = 1200;
    var height = 600;
    var svg = d3.select("#chart") //选择文档中的body元素
        .append("svg") //添加一个svg元素
        .attr("width", width) //设定宽度
        .attr("height", height)
        .style("border", "solid 1px")
        // .style("width","100")

    ; //设定高度

    //    //




    var xdataset = ["A1", "A2", "A3", "A4", "A5"];

    var map ={};

    map["A1"] = {value1:2,value2:5}; 
    map["A2"] = {value1:6,value2:10}; 
    map["A3"] = {value1:6,value2:15}; 
    map["A4"] = {value1:8,value2:20}; 
    map["A5"] = {value1:8,value2:14}; 

    var y1dataset = [0, 2, 4, 6, 8];
    var y2dataset = [0, 5, 10, 15, 20, 25];
    //画布周边的空白
    var padding = { left: 60, right: 60, top: 60, bottom: 50 };
    //
    //
    //    // console.log(d3.range(dataset.length));
    //
    //    //x轴的比例尺
    var xScale = d3.scale.ordinal()
        .domain(xdataset)
        .rangeRoundBands([0, width - padding.left - padding.right]);


    //    console.log(xScale.range());

    //    console.log(xScale("A1"));
    //    console.log(xScale("A2"));
    //    console.log(xScale("A3"));
    //    console.log(xScale("A4"));
    //    console.log(xScale(4));
    // //console.log(d3.range(8));

    //    y轴的比例尺
    var y1Scale = d3.scale.linear()
        .domain([0, d3.max(y1dataset)])
        .range([height - padding.top - padding.bottom, 0]);




    var y2Scale = d3.scale.linear()
        .domain([0, d3.max(y2dataset)])
        .range([height - padding.top - padding.bottom, 0]);




    //定义x轴
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");


    //定义y轴
    var y1Axis = d3.svg.axis()
        .scale(y1Scale)
        .orient("left");


    var y2Axis = d3.svg.axis()
        .scale(y2Scale)
        .orient("right");



    //矩形之间的空白
    var rectPadding = 60;

    // 添加矩形元素
    var rects = svg.selectAll(".MyRect")
            .data(xdataset)
            .enter()
            .append("rect")
            .attr("class","MyRect")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .attr("x", function(d,i){

                // console.log(d,i);
                // console.log(xScale(i));
                return xScale(d) + rectPadding/2;
            } )
            .attr("y",function(d){


               var v1 = map[d].value1;
                // console.log(v1);    
                return y1Scale(v1);
            })
            .attr("width", xScale.rangeBand() - rectPadding )
            .attr("height", function(d){

                var v1 = map[d].value1;
                // console.log(v1);    
                return height - padding.top - padding.bottom - y1Scale(v1);
                // return 100;
            })
            .attr("fill","steelblue")       //填充颜色不要写在CSS里
            .on("mouseover",function(d,i){
                d3.select(this)
                        .attr("fill","yellow");
            })
            .on("mouseout",function(d,i) {
                d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("fill", "steelblue");
            });





    //添加文字元素
    // var texts = svg.selectAll(".MyText")
    //         .data(dataset)
    //         .enter()
    //         .append("text")
    //         .attr("class","MyText")
    //         .attr("transform","translate(" + padding.left + "," + padding.top + ")")
    //         .attr("x", function(d,i){
    //             return xScale(i) + rectPadding/2;
    //         } )
    //         .attr("y",function(d){
    //             return yScale(d);
    //         })
    //         .attr("dx",function(){
    //             return (xScale.rangeBand() - rectPadding)/2;
    //         })
    //         .attr("dy",function(d){
    //             return 20;
    //         })
    //         .text(function(d){
    //             return d;
    //         });
    //
    //
    //
    //    //添加x轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
        .call(xAxis);

    //添加y1轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .call(y1Axis);


    //添加y2轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width - padding.left) + "," + padding.top + ")")
        .call(y2Axis);




    svg.append("text")
        .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (padding.left / 2) + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
        .text("Change Per Activity");

    svg.append("text")
        .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (width / 2) + "," + (height - (padding.bottom / 4)) + ")") // centre below axis
        .text("Completed Activities");


    svg.append("text")
        .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (width-padding.left / 4) + "," + (height / 2) + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
        .text("Cumulative Change");
