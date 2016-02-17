<!DOCTYPE html>
<html>
<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.14/d3.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.1/nv.d3.min.js"></script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.1/nv.d3.css" rel="stylesheet">


    <style>
        text {
            font: 12px sans-serif;
        }
        svg {
            display: block;
        }
        html, body, #chart1, svg {
            margin: 0px;
            padding: 0px;
            height: 100%;
            width: 100%;
        }
        button {
            margin: 2px;
            margin-left: 80px;
        }
    </style>
</head>
<body>
<? 
// json viewer: http://jsonviewer.stack.hu/
//set URL parameters
$nresp = 500;

//build query and get response
// 
$service_url = 'http://unswltuapp.appspot.com/api/filter?question_filters=&embedded_filters=second_level-AND-cid-equal-1234%20&selected_questions=QID2&selected_embedded=cid&survey_id=SV_0xFEeXgZOl56BOR&output_file_format=URL&output_content_format=NATIVE&token=brkJdFzTLlzCkeuzCuMOmOwFM8Lla8E0wNmuYytJ';

//take serviceUrl and the either the scores (1) or sum of scores (2) and returns it for plotting
//usage: makeDataSrc($service_url,1);
function makeDataSrc($api_url,$srcSet){
	
	$curl = curl_init($api_url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	$curl_response = curl_exec($curl);
	if ($curl_response === false) {
		$info = curl_getinfo($curl);
		curl_close($curl);
		die('error occured during curl exec. Additional info: ' . var_export($info));
	}

	//get curl response in a var
	$json_a = json_decode($curl_response, true);

	// build relevant array
	$srcDataArray_1=array();
	$srcDataArray_2=array();
	
	//loop over response set and prepare data arrays; the first one gets the score, the second create a sum
	foreach ($json_a as $respItm => $respItm_val) {
		$srcDataArray_1[] = ($respItm_val['Score']['Sum']);
		$srcDataArray_2[] = (array_sum($srcDataArray_1));
	
	}
	
	//choose which set to return
	$myRValue="["; 
	$k=0;
	
	if ($srcSet==1) {
		$lastElement = end($srcDataArray_1);
		foreach ($srcDataArray_1 as $a_val){
			$k=$k+1;
			if ($a_val == $lastElement){
				$myRValue = $myRValue . "[" . $k . ", " . $a_val . "]";	
			} else {
				$myRValue = $myRValue . "[" . $k . ", " . $a_val . "],";	
			}
		}
	} elseif ($srcSet==2) {
		$lastElement = end($srcDataArray_2);
		foreach ($srcDataArray_2 as $b_val){
			$k=$k+1;
			if ($b_val == $lastElement){
				$myRValue = $myRValue . "[" . $k . ", " . $b_val . "]";	
			} else {
				$myRValue = $myRValue . "[" . $k . ", " . $b_val . "],";	
			}
		}
	} else {
		echo 'error';
	}
	
	$myRValue= $myRValue . "]";
	return $myRValue;
}

?>
<div id="chart1" class='with-3d-shadow with-transitions'>
    <svg> </svg>
</div>

<script>
    var testdata = [
        {
            "key" : "Responses" ,
            "bar": true,
            "values" : <?php echo makeDataSrc($service_url,1); ?>
        },
        {
            "key" : "Cumulative scores" ,
			"color": "red",
            "values" : <?php echo makeDataSrc($service_url,2); ?>
		}
    ].map(function(series) {
            series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
            return series;
        });
    var chart;



    nv.addGraph(function() {
        chart = nv.models.linePlusBarChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .legendRightAxisHint(' [Using Right Axis]')
            .color(d3.scale.category10().range() );
			
		chart.focusEnable(!chart.focusEnable());	
	    chart.xAxis.tickFormat(d3.format('d'));
     	chart.y1Axis.tickFormat(d3.format('d'));
	    chart.y2Axis.tickFormat(d3.format('d'));	
		chart.bars.forceY([0]).padData(true);
        
		d3.select('#chart1 svg')
            .datum(testdata)
            .transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        return chart;
    });
</script>
</body>
</html>