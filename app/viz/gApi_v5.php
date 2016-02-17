<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Student Experience</title>

<!-- Place inside the <head> of your HTML -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<!-- DataTables -->
<script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" charset="utf8" src="//cdn.datatables.net/colvis/1.1.1/js/dataTables.colVis.min.js"></script>
<script type="text/javascript" charset="utf8" src="//cdn.datatables.net/plug-ins/725b2a2115b/integration/jqueryui/dataTables.jqueryui.js"></script>

<style>
.clear {clear: both;}
#tl h2, #bl h2 {font-family:Verdana, Geneva, sans-serif; font-size:12px; padding-left:10px;}
#tr h2, #br h2 {font-family:Verdana, Geneva, sans-serif; font-size:12px; padding-right:10px; text-align:right;}
</style>

<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.2/css/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/colvis/1.1.1/css/dataTables.colVis.css">
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/plug-ins/725b2a2115b/integration/jqueryui/dataTables.jqueryui.css">


</head>
<body>
<? 
// json viewer: http://jsonviewer.stack.hu/
//set URL parameters
$nresp = 500;

//build query and get response
// 
$service_url = 'http://unswltuapp.appspot.com/api/filter?question_filters=&embedded_filters=second_level-AND-cid-equal-1234%20&selected_questions=QID2&selected_embedded=cid&survey_id=SV_0xFEeXgZOl56BOR&output_file_format=URL&output_content_format=NATIVE&token=brkJdFzTLlzCkeuzCuMOmOwFM8Lla8E0wNmuYytJ';

// spit out the actual REST url to see json
echo $service_url . '<br><br>';

?>
<!-- Place this in the body of the page content -->
<div class="clear"></div>

<?

/*
json model turns into associative array:

{
  "R_0rM7O7JMgJbcpX7": {
    "EmailAddress": "", 
    "EndDate": "2016-02-11 18:47:05", 
    "ExternalDataReference": "", 
    "Finished": "1", 
    "IPAddress": null, 
    "Name": "Anonymous", 
    "Q1": "Pharetra ultrices vehicula duis facilisis pellentesque culpa, ultricies. Velit diam.", 
    "Q2": "2", 
    "Q3_1": 2, 
    "Q3_2": 2, 
    "Q3_3": 2, 
    "ResponseSet": "Default Response Set", 
    "Score": {
      "Sum": 6, 
      "WeightedMean": 6, 
      "WeightedStdDev": 0
    }, 
    "StartDate": "2016-02-11 18:47:04", 
    "Status": "2", 
    "cid": "1234"
  },

//example  
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
foreach($age as $x => $x_value) {
    echo "Key=" . $x . ", Value=" . $x_value;
    echo "<br>";
}

  
access structure of associative array from json below:
  $json_a				=> top level responses
  	$respItm			=> each response
		$respItm_a		=> elements of response	
  			
  
  */


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
		var_dump('arr1:', $srcDataArray_1); echo '<br>';
		
		$tpItem = array_sum($srcDataArray_1);
		//echo ' test_sum: ' . $tpItem . '<br>';
		
		$srcDataArray_2[] = ($tpItem);
		var_dump('arr2:',$srcDataArray_2); echo '<br>';
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
	//close request
	curl_close($curl);
}


// dump everything for checking
echo '<br><h3>Full json</h3>';
var_dump($json_a);
echo '<br>';

// dump the string for checks
echo '<br><h3>data output string</h3>';
echo 'arr1: ' . makeDataSrc($service_url,1) . '<br>';
echo 'arr2: ' . makeDataSrc($service_url,2);

echo '<br>';




?>
</body>
</html>