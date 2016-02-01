/**
 * Created by kevin on 12/15/2015.
 */

'use strict';

angular
    .module('mooc')
    .controller('ManualCtrl', ['$scope', '$window', '$stateParams', '$document', '$state', '$timeout', 'userCookie', 'appConstants', '$http', 'CourseDataService',
        function ($scope, $window, $stateParams, $document, $state, $timeout, userCookie, appConstants, $http, CourseDataService) {
            $scope.viewType = $stateParams.page;
            $scope.courseName = $stateParams.courseName;

            $scope.alerts = [];
            $scope.sidr = null;
            $scope.main = null;
            $scope.topMenu = null;
            $scope.courseDetail = null;
            $scope.sidrMap = {};
            $scope.mainMap = {};
            $scope.domMap = {};
            $scope.topMenuReportMap = {};
            $scope.topMenuDomMap = {};
            $scope.viz = {};
            var courseDetailPromise = CourseDataService.getCourseData($scope.courseName);
            courseDetailPromise.then(function (data) {
                    $scope.courseDetail = angular.copy(data);

                    $scope.validateCourseJson($scope.courseDetail) || $scope.alerts.push({
                        type: 'danger',
                        msg: 'Invalid json'
                    });

                    $scope.extractSidrInfo($scope.courseDetail);
                    $scope.extractMainInfo($scope.courseDetail);
                    $scope.extractTopMenu($scope.courseDetail);

                },
                function (error) {
                    //Need to handel error case
                    console.error(error);
                    $scope.alerts.push({
                        type: 'danger',
                        msg: 'error'
                    });
                }
            );

            $scope.validateCourseJson = function (course) {
                return angular.isDefined(course['mooc']);
            };


            $scope.extractMainInfo = function (course) {

                var main = course.mooc.main;

                $scope.main = main;


                for (var i = 0, length = main.length; i < length; i++) {

                    var o = main[i], category = o.category.trim().toLowerCase();
                    if (o.type.indexOf('report')===-1) {
                        continue;
                    }
                    angular.isUndefined($scope.mainMap[category]) && ($scope.mainMap[category] = o);
                }


                for (var i = 0, length = main.length; i < length; i++) {
                    var o = main[i], category = o.category.trim().toLowerCase();
                    if (o.type.indexOf('domain')===-1) {
                        continue;
                    }
                    angular.isUndefined($scope.domMap[category]) && ($scope.domMap[category] = o);
                }
            };


            $scope.extractSidrInfo = function (course) {

                //TODO: Make mooc sidemenu name consistent
                var sidr = course.mooc.sdr || course.mooc.sidemenu;

                if (angular.isUndefined(sidr)) {
                    $scope.alerts.push({
                        type: 'danger',
                        msg: 'no siderBar'
                    });
                    return;
                }

                $scope.sidr = sidr;

                for (var i = 0, length = sidr.length; i < length; i++) {

                    var o = sidr[i];
                    var category = o.category.trim().toLowerCase();
                    if (angular.isUndefined($scope.sidrMap[category])) {
                        $scope.sidrMap[category] = [];
                        $scope.sidrMap[category].push(o);
                    } else {
                        $scope.sidrMap[category].push(o);
                    }
                }
            };


            $scope.extractTopMenu = function (course) {


                var topMenu = course.mooc.topmenu || course.mooc.topMenu;

                if (angular.isUndefined(topMenu)) {
                    $scope.alerts.push({
                        type: 'danger',
                        msg: 'no topMenu'
                    });
                    return;
                }

                $scope.topMenu = topMenu;

                for (var i = 0, length = topMenu.length; i < length; i++) {

                    var o = topMenu[i], category = o.category.trim().toLowerCase();
                    if (o.type.indexOf('report')===-1) {
                        continue;
                    }
                    angular.isUndefined($scope.topMenuReportMap[category]) && ($scope.topMenuReportMap[category] = o);
                }


                for (var i = 0, length = topMenu.length; i < length; i++) {
                    var o = topMenu[i], category = o.category.trim().toLowerCase();
                    if (o.type.indexOf('domain')===-1) {
                        continue;
                    }
                    angular.isUndefined($scope.topMenuDomMap[category]) && ($scope.topMenuDomMap[category] = o);
                }
            };


            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };


            $scope.goToSingleView = function (location) {

                try {
                    $window.location.href = '/#/singleview/' + $scope.courseName + '/' + location;

                    //$window.location.href = 'https://cc3948027cc783f6aae60587c570b1b52afa7eec.googledrive.com/host/0B5lCcvQYS1mRZ3Bsd05KcUFGTE0/#/singleview/' + $scope.courseName + '/' + location;
                }
                finally{
                    $window.location.reload(true);
                }
                //hacky way
                //angular.element(document.querySelector('#mooc')).removeAttr('style');
            };

            $scope.goToHome = function (courseName) {
                try {
                    $window.location.href = '/#/dashboard/' + courseName;

                    //$window.location.href = 'https://cc3948027cc783f6aae60587c570b1b52afa7eec.googledrive.com/host/0B5lCcvQYS1mRZ3Bsd05KcUFGTE0/#/dashboard/' + courseName;
                }
                finally{
                    $window.location.reload(true);
                }

            };
            $scope.goToManual = function (courseName) {
                try {
                    $window.location.href = '/#/manual/' + courseName;

                    //$window.location.href = 'https://cc3948027cc783f6aae60587c570b1b52afa7eec.googledrive.com/host/0B5lCcvQYS1mRZ3Bsd05KcUFGTE0/#/manual/' + courseName;
                }finally{
                    $window.location.reload(true);

                }
            };


            $scope.showHelp = function () {
                $scope.showhelp = !$scope.showhelp;

                var keys = Object.keys($scope.courseDetail.mooc);
                for (var i = 0, length = keys.length; i < keys.length; i++) {
                    var key = keys[i];
                    if (Array.isArray($scope.courseDetail.mooc[key])) {
                        var section = $scope.courseDetail.mooc[key];

                        for (var y = 0, length = section.length; y < section.length; y++) {
                            if (angular.isDefined(section[y].page) && (typeof section[y].page === 'string' || section[y].page instanceof String) && section[y].page.indexOf($scope.viewType)!=-1) {

                                var html = section[y].description;


                                var myTransform = {'tag':'${tag}','id':'${id}','html':'${html}'};
                                var rawHTML= json2html.transform(html,myTransform);

                                console.log(rawHTML);


                                document.getElementById("helpspace").innerHTML=rawHTML;
                                //$( "#introText" ).replaceWith(rawHTML);
                            }
                        }
                    }
                }
            }
        }]);


