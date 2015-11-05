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
      "Content",
      "Videos",
      "Forum",
      "Social media",
      "Evaluation",
      "Activities",
      "Participants",
      "Videos",
      "Content",
      "Forum",
      "Evaluation",
      "Social media",
      "Research"
    ];


    $scope.isObj = function (value) {
      return angular.isObject(value);
    };

    var convertTreeToJson = function (node, items) {
      for (var y = 0, length = items.length; y < length; y++) {
        var keyElement = items[y];
        if (angular.isDefined(keyElement.items)) {

          node[keyElement.label] = {};
          convertTreeToJson(node[keyElement.label], keyElement.items);
        } else {
          node[keyElement.label] = keyElement.value;
        }
      }
    };


    $scope.$watch('list', function (newVal, oldVal) {
      console.log('updating');
      $scope.getNewJson();
    }, true);


    $scope.getNewJson = function () {

      var newJsonArray = [];
      for (var i = 0, length = $scope.list.length; i < length; i++) {
        var newJson = {};
        var node = $scope.list[i];
        convertTreeToJson(newJson, node.items);
        newJsonArray.push(newJson);
      }

      if (newJsonArray.length === 1) {
        $scope.newJson = newJsonArray.shift();
      } else {
        $scope.newJson = newJsonArray
      }

      return $scope.newJson;
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

    $scope.establishTree = function (row, parent) {


      for (var key in row) {
        var value = row[key];
        var childNode = {};
        childNode.label = key;
        childNode.value = value;
        if (typeof childNode.value === "object") {
          childNode.items = [];
          $scope.establishTree(childNode.value, childNode.items);
        }
        parent.push(childNode);
      }

    };


    $scope.convertJsonToTree = function (sourceJson) {

      var tempArray = [];
      var sourceTree = [];

      if (!Array.isArray(sourceJson)) {
        tempArray.push(sourceJson);
      } else {
        tempArray = sourceJson;
      }


      for (var i = 0, length = tempArray.length; i < length; i++) {
        var row = tempArray[i];
        var tempNode = {};
        if (row.hasOwnProperty("page")) {
          tempNode.label = row.page;
          tempNode.value = row;
        } else {
          tempNode.label = 'item' + i + 1;
          tempNode.value = {};
        }
        tempNode.items = [];
        $scope.establishTree(row, tempNode.items);
        sourceTree.push(tempNode);
      }
      ;

      $scope.list = sourceTree;
    };

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
              console.log(file);
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
                      scope.convertJsonToTree(jsonObj);
                    });
                    toastr.success('Load json successfully', 'Success', {
                      closeButton: true
                    });
                  } catch (e) {
                    toastr.error('Invalid json or csv', 'Error', {
                      closeButton: true
                    });

                  }

                };
                reader.readAsText(file);
              } else {

                console.log('I am csv ');


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
})(window.angular);
