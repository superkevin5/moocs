/**
 * Created by kevin on 12/15/2015.
 */

'use strict';

angular
    .module('mooc')
    .controller('DashboardCtrl', ['$scope', '$stateParams', '$document', '$state', '$timeout', 'userCookie', 'appConstants', '$http', 'CourseDataService', '$window',
        function ($scope, $stateParams, $document, $state, $timeout, userCookie, appConstants, $http, CourseDataService, $window) {

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

                    $scope.validateCourseJson($scope.courseDetail) || $scope.alerts.push[{
                        type: 'danger',
                        msg: 'Invalid json'
                    }];

                    $scope.extractSidrInfo($scope.courseDetail);
                    $scope.extractMainInfo($scope.courseDetail);

                },
                function (error) {
                    //Need to handel error case
                    console.error(error);
                    $scope.alerts.push[{
                        type: 'danger',
                        msg: 'error'
                    }];
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
                    if (!o.type.includes('report') || !o.page.includes('main')) {
                        continue;
                    }
                    angular.isUndefined($scope.mainMap[category]) && ($scope.mainMap[category] = o);
                }


                for (var i = 0, length = main.length; i < length; i++) {
                    var o = main[i], category = o.category.trim().toLowerCase();
                    if (!o.type.includes('domain') || !o.page.includes('dom')) {
                        continue;
                    }
                    angular.isUndefined($scope.domMap[category]) && ($scope.domMap[category] = o);
                }
            };


            $scope.extractSidrInfo = function (course) {

                //TODO: Make mooc sidemenu name consistent
                var sidr = course.mooc.sdr || course.mooc.sidemenu;

                if (angular.isUndefined(sidr)) {
                    $scope.alerts.push[{
                        type: 'danger',
                        msg: 'no siderBar'
                    }];
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
                $window.location.href = '/#/singleview/' + location;
                //hacky way
                //angular.element(document.querySelector('#mooc')).removeAttr('style');
            };

            $scope.goToHome = function (courseName) {
                $window.location.href = '/#/dashboard/' + courseName;
                $window.location.reload(true);
            };


        }]);

