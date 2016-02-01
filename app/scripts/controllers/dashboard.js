/**
 * Created by kevin on 12/15/2015.
 */

'use strict';

angular
    .module('mooc')
    .controller('DashboardCtrl', ['$rootScope','$scope', '$stateParams', '$document', '$state', '$timeout', 'userCookie', 'appConstants', '$http', 'CourseDataService', '$window', '$location',
        function ($rootScope, $scope, $stateParams, $document, $state, $timeout, userCookie, appConstants, $http, CourseDataService, $window, $location) {

            $scope.courseName = $stateParams.courseName;
            console.log($scope.courseName);
            $scope.alerts = [];
            $scope.sidr = null;
            $scope.main = null;
            $scope.courseDetail = null;
            $scope.sidrMap = {};
            $scope.mainMap = {};
            $scope.domMap = {};

            var courseDetailPromise = CourseDataService.getCourseData($scope.courseName);
            courseDetailPromise.then(function (data) {
                    $scope.courseDetail = angular.copy(data);

                    $scope.validateCourseJson($scope.courseDetail) || $scope.alerts.push({
                        type: 'danger',
                        msg: 'Invalid json'
                    });

                    $scope.extractSidrInfo($scope.courseDetail);
                    $scope.extractMainInfo($scope.courseDetail);

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


            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.goToSingleView = function (location) {

                if (location === 'sdr_home') {
                    $state.go('dash.home');
                } else {
                    $state.go('dash.single', {
                        courseName: $scope.courseName,
                        page: location
                    });
                }
            };

            $scope.goToHome = function (courseName) {
                $state.go('dash.home');
            };

            $scope.goToManual = function (courseName) {
                $state.go('dash.manual');
            };


            $scope.showMoocHelp = function () {
                $rootScope.showhelp = !$rootScope.showhelp;

                var url = $location.path();

                var pathArray = url.split('/');

                $scope.viewType = pathArray[pathArray.length - 1];

                if ('home' === $scope.viewType) {


                    var str = '<p>This is an alpha prototype dashboard produced by the LTU LADA team in order to characterise the activity in' +
                        'MOOCs.<br/> In order to facilitate the organisation of the large amount of data and details we provided' +
                        'three paths to explore the data. </p>' +
                        '<ul>' +
                        '<li>On the left there is an overview by categories of information.</li>' +
                        '<li>On the right the information is presented based on functional domains.</li>' +
                        '<li>A full site maps with links to individual section is provided by expanding the pull menu on the right' +
                        'side of the page.' +
                        '</li>' +
                        '</ul>';

                    document.getElementById("helpspace").innerHTML = str;
                    return;
                }


                var keys = Object.keys($scope.courseDetail.mooc);
                for (var i = 0, length = keys.length; i < keys.length; i++) {
                    var key = keys[i];
                    if (Array.isArray($scope.courseDetail.mooc[key])) {
                        var section = $scope.courseDetail.mooc[key];

                        for (var y = 0, length = section.length; y < section.length; y++) {
                            if (angular.isDefined(section[y].page) && (typeof section[y].page === 'string' || section[y].page instanceof String) && section[y].page.indexOf($scope.viewType) !=-1) {

                                var html = section[y].description;


                                var myTransform = {'tag': '${tag}', 'id': '${id}', 'html': '${html}'};
                                var rawHTML = json2html.transform(html, myTransform);

                                console.log(rawHTML);


                                document.getElementById("helpspace").innerHTML = rawHTML;
                                //$( "#introText" ).replaceWith(rawHTML);
                            }
                        }
                    }
                }
            };

            $state.go('dash.home');
        }]);

