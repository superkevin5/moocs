(function (angular) {
  'use strict';
  angular.module('jsoneditor', ['ui.bootstrap', 'toastr', 'ngAnimate']).controller('jsoneditor', function ($scope, toastr) {
    $scope.list = [];
    $scope.categories = [
      "Overview",
      "Home",
      "Who are the participants?",
      "What did participants do?",
      "Assessment",
      "Research",
      "Forum",
      "Social media",
      "Evaluation",
      "Activities",
      "Participants",
      "Videos",
      "Content",
       "sport"
    ];


    $scope.isObj = function (value) {
      return angular.isObject(value);
    };

    $scope.$watch('list', function (newVal, oldVal) {
      console.log('updating');
      $scope.getNewJson();
    }, true);



    $scope.convertArrayInList = function(itemsInArray,node){

      for(var i= 0,length=itemsInArray.length;i<length;i++) {
          var obj = itemsInArray[i];
          var tempObj = {};
          if(angular.isDefined(obj.items)){
            //node[obj.label]= {};
            $scope.convertObjectInList(obj.items,tempObj);
          }else{
              tempObj = obj.value
          }
          node.push(tempObj);
      }
    };

    $scope.convertObjectInList = function(itemsInArray,node){
        for(var i= 0,length=itemsInArray.length;i<length;i++){
          var obj = itemsInArray[i];
          if(angular.isDefined(obj.items)){
            node[obj.label]= {};
            $scope.convertObjectInList(obj.items,node[obj.label]);
          }else if(angular.isDefined(obj.array)){
            node[obj.label]= [];
            $scope.convertArrayInList(obj.array,node[obj.label]);
          }else{
            node[obj.label]= obj.value;
          }
        }
    };





    $scope.getNewJsonHandleArray = function(array){
      var newJsonArray = null;
      var isParentObject = false;
      for (var i = 0, length = array.length; i < length; i++) {
        if(angular.isUndefined(array[i].items)){
          isParentObject = true;
          break;
        }
      }

      if(isParentObject){
        newJsonArray = {};
        for (var i = 0, length = array.length; i < length; i++) {
          var node = array[i];
          if(angular.isUndefined(node.items)&&angular.isUndefined(node.array)) {
            newJsonArray[node.label] = node.value;
          }else if(angular.isDefined(node.items)){
            newJsonArray[node.label] = {};
            $scope.convertObjectInList(node.items,newJsonArray[node.label]);
          }else if(angular.isDefined(node.array)){
            newJsonArray[node.label] = [];
            $scope.convertArrayInList(node.array,newJsonArray[node.label]);
            }
        }
      }else{

        newJsonArray = [];

        for (var i = 0, length = array.length; i < length; i++) {
          var node = array[i];
          var tempObj = {};
          if(angular.isUndefined(node.items)&&angular.isUndefined(node.array)) {
            newJsonArray.push(node.value);
          }else if(angular.isDefined(node.items)){
            //newJsonArray[node.label] = {};
            $scope.convertObjectInList(node.items,tempObj);
            newJsonArray.push(tempObj);
          }else if(angular.isDefined(node.array)){
            newJsonArray[node.label] = [];
            $scope.convertArrayInList(node.array,newJsonArray[node.label]);
          }
        }







      }
      return newJsonArray;
    };


    $scope.getNewJson = function (){

      $scope.newJson=$scope.getNewJsonHandleArray($scope.list);
    };



    $scope.download = function () {


      $scope.getNewJson();

      //validate json
      var validateJson = function () {
        var jsonObj = null;
        try {
          jsonObj = JSON.parse(JSON.stringify($scope.newJson));
          return true;
        } catch (e) {
          jsonObj = null;
          console.error(e);

          return false;
        }
      };

      if (!validateJson()) return;
      $("<a/>", {
        "download": "data.json",
        "href": "data:application/json," + encodeURIComponent(JSON.stringify($scope.newJson, null, '\t'))
      }).appendTo("body")
        .click(function () {
          $(this).remove()
        })[0].click()


    };


    $scope.convertJsonToTree = function (sourceJson) {

      var sourceTree = [];

      if (Array.isArray(sourceJson)) {
        $scope.convertArrayInJson(sourceJson,sourceTree);
      } else {
        $scope.convertObjectInJson(sourceJson,sourceTree);
      }
      return sourceTree;
  };


  $scope.convertArrayInJson = function (realArray, sourceArray) {

    for(var i = 0,length=realArray.length;i<length;i++){

      var realElement = realArray[i];

      var node = {};
      node.label= 'item' + i + 1;
      node.items= [];
      if(realElement.hasOwnProperty("page")){
        node.label= realElement.page;
      }
      node.value = {};
      $scope.convertObjectInJson(realElement,node.items);
      sourceArray.push(node);
    }
  };


  $scope.convertObjectInJson = function (realelment,items) {


    angular.forEach(realelment,function(value,key){

      console.log(value+ ' ' +key);
        var node ={};

        node.label = key;
        node.value = value;

        if(Array.isArray(value)){
          node.value=value;
          node.array = [];
          node.value=[];
          $scope.convertArrayInJson(value,node.array);
        }else if($scope.isObj(value)){
          node.value=value;
          node.items = [];
          node.value={};
          $scope.convertObjectInJson(value,node.items);
        }


          items.push(node);
    });



  };


  //Dummy algorithm to judge if it is the heading

  $scope.getHeadingRow = function (worksheet) {

    var headingRowNumber = -1, tempHeadingRow = [], max = 0, map = {};

    angular.forEach(worksheet, function (value, key) {

      var cell = value;

      var value = new String(cell.v).toLowerCase();

      if (value === 'type' || value === 'order' || value === 'level' || value === 'category' || value === 'section' || value === 'page' ||
        value === 'tableauview' || value === 'description' || value === 'link' || value === 'page' || value === 'des2' || value === 'jsonsection') {
        tempHeadingRow.push(key);
      }
    });


    for (var i = 0, length = tempHeadingRow.length; i < length; i++) {

      var re = /(?:[A-Z]+([0-9]+))?$/;
      var ext = re.exec(tempHeadingRow[i])[1];

      if (angular.isUndefined(map[ext])) {
        map[ext] = 0
      } else {
        map[ext]++;
      }
    }

    angular.forEach(map, function (value, key) {


      if (value > max) {
        headingRowNumber = key;
        max = value;
      }

    });

    console.log(headingRowNumber);
    return headingRowNumber;

  };


  $scope.validateSheet = function (worksheet, headingRowNumber) {


    if (headingRowNumber === -1) {
      toastr.error('Please give correct  file according to spec', 'Error');
      throw 'error';
    }

    var ref = worksheet['!ref'];
    var re = /([A-Z])[0-9]+?:([A-Z])[0-9]+$/;
    var min = re.exec(ref)[1];

    var max = re.exec(ref)[2];

    var columnMap = {};

    var requiredColumn = ['type', 'order', 'level', 'category', 'section', 'page', 'tableauview', 'link', 'des2', 'jsonsection'];


    for (var columnIndex = min.charCodeAt(0); columnIndex <= max.charCodeAt(0); columnIndex++) {


      var column = String.fromCharCode(columnIndex);

      var tempKey = column + headingRowNumber;


      if (angular.isUndefined((worksheet[tempKey]))) {
        continue;
      }


      var headingValue = new String(worksheet[tempKey].v).toLowerCase();


      if (requiredColumn.indexOf(headingValue) !== -1) {

        if (angular.isDefined(columnMap[headingValue])) {
          toastr.error('Duplicated column exists, Please give correct  file according to spec', 'Error');
          throw 'error';
        }
        columnMap[headingValue] = column;
      }
    }


    angular.forEach(columnMap, function (value, key) {
      var index = requiredColumn.indexOf(key);
      console.log(key);
      if (index !== -1) {
        requiredColumn.splice(index, 1);
      }
    });


    if (requiredColumn.length > 0) {
      toastr.error('Please give required heading Column (' + requiredColumn + ') in order to generate the correct json', 'Error');
      throw 'error';
    }


    return columnMap;

  };


  $scope.selectSheet = function (sheetName) {
    var worksheet = $scope.workbook.Sheets[sheetName];
    var headingRowNumber = $scope.getHeadingRow(worksheet);


    var columnMap = $scope.validateSheet(worksheet, headingRowNumber);
    toastr.success('Successfully Load sheet', 'Success');


    console.log(columnMap);


  }


})
  .directive('dropZone', function (toastr) {
    return {
      restrict: 'A',
      link: function (scope, element) {


        var dropzoneConfig = {
          //URl is compulsory
          url: '/fake',
          //method is compulsory here
          method: 'get',
          acceptedFiles: ".json, .csv, .xls,.xlsx",
          maxFilesize: 10000, //MB
          maxFiles: 1,
          paramName: 'uploadfile',
          maxThumbnailFilesize: 10,
          parallelUploads: 1,
          autoProcessQueue: true,
          dictDefaultMessage: '\<img src=https://googledrive.com/host/0B8KqLaP_s06IYzdzRWg0MTR1a0k/toold_data.png\><label>(Drop or select .CSV .JSON .XLS .XLSX File)</label>'
        };

        var dropzone = new Dropzone(element[0], dropzoneConfig);
        dropzone.on('addedfile', function (file) {

          scope.list = [];
          try {
            var fileNumber = dropzone.files.length;
            if (fileNumber > 1) {
              dropzone.removeFile(dropzone.files[0]);
            }


            var re = /(?:\.([^.]+))?$/;
            var ext = re.exec(file.name)[1];


            if (ext === 'json') {

              var reader = new FileReader();
              reader.onload = function (e) {
                var contents = e.target.result;

                try {
                  var jsonObj = JSON.parse(contents);
                  var jsonPretty = JSON.stringify(jsonObj, null, '\t');
                  scope.$apply(function () {
                    scope.list = scope.convertJsonToTree(jsonObj);
                  });
                  toastr.success('Load json successfully', 'Success', {
                    closeButton: true
                  });
                } catch (e) {
                  toastr.error('Invalid json', 'Error', {
                    closeButton: true
                  });

                }

              };
              reader.readAsText(file);
            } else {

              console.log('I am csv/xslx');

              var reader = new FileReader();
              reader.onload = function (e) {
                var data = e.target.result;

                /* if binary string, read with type 'binary' */
                var workbook = XLSX.read(data, {type: 'binary'});

                /* DO SOMETHING WITH workbook HERE */

                scope.$apply(function () {
                  scope.workbook = angular.copy(workbook);
                  scope.sheetNames = scope.workbook.SheetNames;
                });

              };
              reader.readAsBinaryString(file);


            }
          } catch (e) {
            toastr.error('unsupported file', 'Error', {
              closeButton: true
            });

          }


        });
      }
    };
  });
})
(window.angular);
