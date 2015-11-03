(function(angular) {
  'use strict';
  angular.module('jsoneditor', ['ui.bootstrap']).controller('jsoneditor', function($scope) {

    var sourceJson = [
      {"type": "report",
        "order": "2",
        "level": "li",
        "category": "Who are the participants?",
        "section": "Who are the participants?",
        "page": "main_participants",
        "tableauView": 1,
        "Link": "https://10ay.online.tableau.com/t/unswmooc/views/Whoaretheparticipants_2/Demographics",
        "description": {"tag":"div","id":"introText","html":"<h2 style=font-style:italic>Report Categories - Who are the participants?</h2><p>This section shows basic demographic information of the registrants, the data sourced from both coursera demographic survey and course pre-course survey.</p><p>The map gives genders distribution of the registrants who has responded to either of the survey. The icons are scaled for easier comparison. The geographical distribution also indicated where they are mostly from.</p><p>The top 5 countries have the most survey respondents are listed in&nbsp;the box.</p>"}
      },
      {"type": "report",
        "order": "3",
        "level": "li",
        "category": "What did participants do?",
        "section": "Overview of Activity",
        "page": "main_activity",
        "tableauView": 1,
        "Link": "https://10ay.online.tableau.com/t/unswmooc/views/Whatdidpartidantsdo_1/Whatdidparticipantsdo_Overview",
        "description": {"tag":"div","id":"introText","html":"<h2>Report Categories - What did the participants do?</h2><p><br>This section shows what active registrants have done in the course including&nbsp;Use of Video, Forum, Quiz submission and Tests in the course. Also includes peer assessment performance.&nbsp;</p><p>Blue heatmaps&nbsp;give an overview of participants&#39; activities by week.&nbsp;The color is range from 0% (grey) to 100% (dark Blue).&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>"}
      }
    ];



    var establishTree = function (row, parent) {


      for (var key in row) {
        var value = row[key];
        var childNode = {};
        childNode.label = key;


        childNode.value = value;
        if (typeof childNode.value === "object") {
          childNode.items = [];
          establishTree(childNode.value, childNode.items);
        }
        parent.push(childNode);
      }

    };


    var convertJsonToTree = function (sourceJson) {

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
          tempNode.value = 'item' + i + 1;
        }
        tempNode.items = [];
        establishTree(row, tempNode.items);
        sourceTree.push(tempNode);
      };


      $scope.list = sourceTree;
    };



    convertJsonToTree(sourceJson);


  });
})(window.angular);
