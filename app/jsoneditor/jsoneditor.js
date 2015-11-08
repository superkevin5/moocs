(function (angular) {
  'use strict';
  angular.module('jsoneditor', ['ui.bootstrap', 'toastr', 'ngAnimate', 'ngFileSaver']).
    controller('jsoneditor', function ($scope, toastr, FileSaver, Blob) {
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


      $scope.convertArrayInList = function (itemsInArray, node) {

        for (var i = 0, length = itemsInArray.length; i < length; i++) {
          var obj = itemsInArray[i];
          var tempObj = {};
          if (angular.isDefined(obj.items)) {
            //node[obj.label]= {};
            $scope.convertObjectInList(obj.items, tempObj);
          } else {
            tempObj = obj.value
          }
          node.push(tempObj);
        }
      };

      $scope.convertObjectInList = function (itemsInArray, node) {
        for (var i = 0, length = itemsInArray.length; i < length; i++) {
          var obj = itemsInArray[i];
          if (angular.isDefined(obj.items)) {
            node[obj.label] = {};
            $scope.convertObjectInList(obj.items, node[obj.label]);
          } else if (angular.isDefined(obj.array)) {
            node[obj.label] = [];
            $scope.convertArrayInList(obj.array, node[obj.label]);
          } else {
            node[obj.label] = obj.value;
          }
        }
      };


      $scope.getNewJsonHandleArray = function (array) {
        var newJsonArray = null;
        var isParentObject = false;
        for (var i = 0, length = array.length; i < length; i++) {
          if (angular.isUndefined(array[i].items)) {
            isParentObject = true;
            break;
          }
        }

        if (isParentObject) {
          newJsonArray = {};
          for (var i = 0, length = array.length; i < length; i++) {
            var node = array[i];
            if (angular.isUndefined(node.items) && angular.isUndefined(node.array)) {
              newJsonArray[node.label] = node.value;
            } else if (angular.isDefined(node.items)) {
              newJsonArray[node.label] = {};
              $scope.convertObjectInList(node.items, newJsonArray[node.label]);
            } else if (angular.isDefined(node.array)) {
              newJsonArray[node.label] = [];
              $scope.convertArrayInList(node.array, newJsonArray[node.label]);
            }
          }
        } else {

          newJsonArray = [];

          for (var i = 0, length = array.length; i < length; i++) {
            var node = array[i];
            var tempObj = {};
            if (angular.isUndefined(node.items) && angular.isUndefined(node.array)) {
              newJsonArray.push(node.value);
            } else if (angular.isDefined(node.items)) {
              //newJsonArray[node.label] = {};
              $scope.convertObjectInList(node.items, tempObj);
              newJsonArray.push(tempObj);
            } else if (angular.isDefined(node.array)) {
              //newJsonArray[node.label] = [];
              //$scope.convertArrayInList(node.array, newJsonArray[node.label]);

              // it will never reach here

            }
          }

        }
        return newJsonArray;
      };


      $scope.getNewJson = function () {
        $scope.newJson = $scope.getNewJsonHandleArray($scope.list);
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

        var data = new Blob([JSON.stringify($scope.newJson, null, '\t')], {type: 'text/plain;charset=utf-8'});
        FileSaver.saveAs(data, 'data.json');
        toastr.success('Seccuessfully download the new json', 'Success');

      };


      $scope.convertJsonToTree = function (sourceJson) {

        var sourceTree = [];

        if (Array.isArray(sourceJson)) {
          $scope.convertArrayInJson(sourceJson, sourceTree);
        } else {
          $scope.convertObjectInJson(sourceJson, sourceTree);
        }
        return sourceTree;
      };


      $scope.convertArrayInJson = function (realArray, sourceArray) {

        for (var i = 0, length = realArray.length; i < length; i++) {

          var realElement = realArray[i];

          var node = {};
          node.label = 'item' + i + 1;
          node.items = [];
          if (realElement.hasOwnProperty("page")) {
            node.label = realElement.page;
          }
          node.value = {};
          $scope.convertObjectInJson(realElement, node.items);
          sourceArray.push(node);
        }
      };


      $scope.convertObjectInJson = function (realelment, items) {


        angular.forEach(realelment, function (value, key) {

          var node = {};

          node.label = key;
          node.value = value;

          if (Array.isArray(value)) {
            node.value = value;
            node.array = [];
            node.value = [];
            $scope.convertArrayInJson(value, node.array);
          } else if ($scope.isObj(value)) {
            node.value = value;
            node.items = [];
            node.value = {};
            $scope.convertObjectInJson(value, node.items);
          }


          items.push(node);
        });


      };


      $scope.getEndingRow = function (worksheet) {

        var ref = worksheet['!ref'];

        var re = null;
        if (ref.indexOf(":") != -1) {
          re = /([A-Z])[0-9]+?:([A-Z])([0-9]+)$/;
          return re.exec(ref)[3];
        } else {
          re = /[A-Z]+([0-9])+$/;
          return re.exec(ref)[1];
        }
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

        if (angular.isUndefined(worksheet['!ref'])) {
          toastr.error('Nothing in this sheet', 'Error');
          throw 'error';
        }

        var endingRowNumber = $scope.getEndingRow(worksheet);
        var headingRowNumber = $scope.getHeadingRow(worksheet);
        var columnMap = $scope.validateSheet(worksheet, headingRowNumber);
        toastr.success('Successfully Load sheet', 'Success');

        var finalConvertedJson = {"moocs": {}};

        var jsonSectionColumn = columnMap['jsonsection'];
        var typeColumn = columnMap['type'];
        var orderColumn = columnMap['order'];
        var levelColumn = columnMap['level'];
        var categoryColumn = columnMap['category'];
        var sectionColumn = columnMap['section'];
        var pageColumn = columnMap['page'];
        var tableauviewColumn = columnMap['tableauview'];
        var linkColumn = columnMap['link'];
        var des2Column = columnMap['des2'];


        for (var index = parseInt(headingRowNumber) + 1; index <= parseInt(endingRowNumber); index++) {

          //var moocElement = {};

          var jsonSectionCellIndex = new String(jsonSectionColumn + index);
          var typeCellIndex = new String(typeColumn + index);
          var orderCellIndex = new String(orderColumn + index);
          var levelCellIndex = new String(levelColumn + index);
          var categoryCellIndex = new String(categoryColumn + index);
          var sectionCellIndex = new String(sectionColumn + index);
          var pageCellIndex = new String(pageColumn + index);
          var tableauviewCellIndex = new String(tableauviewColumn + index);
          var linkCellIndex = new String(linkColumn + index);
          var des2CellIndex = new String(des2Column + index);

          if (angular.isUndefined(worksheet[jsonSectionCellIndex]) || angular.isUndefined(worksheet[pageCellIndex]) || angular.isUndefined(worksheet[orderCellIndex])) {
            continue;
          }


          var jsonSectionCellValue = angular.isDefined(worksheet[jsonSectionCellIndex]) ? (worksheet[jsonSectionCellIndex].v) : '';
          var typeCellCellValue = angular.isDefined(worksheet[typeCellIndex]) ? worksheet[typeCellIndex].v : '';
          var orderCellValue = angular.isDefined(worksheet[orderCellIndex]) ? worksheet[orderCellIndex].v : '';
          var levelCellValue = angular.isDefined(worksheet[levelCellIndex]) ? worksheet[levelCellIndex].v : '';
          var categoryCellValue = angular.isDefined(worksheet[categoryCellIndex]) ? worksheet[categoryCellIndex].v : '';
          var sectionCellValue = angular.isDefined(worksheet[sectionCellIndex]) ? worksheet[sectionCellIndex].v : '';
          var pageCellValue = angular.isDefined(worksheet[pageCellIndex]) ? worksheet[pageCellIndex].v : '';
          var tableauviewCellValue = angular.isDefined(worksheet[tableauviewCellIndex]) ? worksheet[tableauviewCellIndex].v : '';
          var linkCellValue = angular.isDefined(worksheet[linkCellIndex]) ? worksheet[linkCellIndex].v : '';
          var des2CellValue = angular.isDefined(worksheet[des2CellIndex]) ? worksheet[des2CellIndex].v : '';


          if (angular.isUndefined(finalConvertedJson.moocs[jsonSectionCellValue])) {
            finalConvertedJson.moocs[jsonSectionCellValue] = [];
          }


          var tempObj = {
            "type": typeCellCellValue,
            "order": orderCellValue,
            "level": levelCellValue,
            "category": categoryCellValue,
            "section": sectionCellValue,
            "page": pageCellValue,
            "tableauviewCellValue": tableauviewCellValue,
            "Link": linkCellValue,
            "description": {
              "tag": "div",
              "id": "introText",
              "html": des2CellValue
            }
          };

          finalConvertedJson.moocs[jsonSectionCellValue].push(tempObj);


        }


        $scope.list = $scope.convertJsonToTree(finalConvertedJson);

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
            scope.sheetNames = [];
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
                reader.onloadend = function (e) {

                  var data = e.target.result;
                  var arr = fixdata(data);
                  var workbook = XLSX.read(btoa(arr), {type: 'base64'});

                  /* DO SOMETHING WITH workbook HERE */

                  scope.$apply(function () {
                    scope.workbook = angular.copy(workbook);
                    scope.sheetNames = scope.workbook.SheetNames;
                  });

                };
                reader.readAsArrayBuffer(file);
              }
            } catch (e) {
              toastr.error('unsupported file', 'Error', {
                closeButton: true
              });

            }


          });


          var fixdata = function (data) {
            var o = "", l = 0, w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
          }

        }
      };
    });
})
(window.angular);
