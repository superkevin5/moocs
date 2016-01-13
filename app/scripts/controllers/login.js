/**
 * Created by kevin on 12/15/2015.
 */


'use strict';

angular
    .module('mooc')
    .controller('LoginCtrl', ['$scope', '$document', '$state', '$timeout', 'userCookie', 'appConstants',
        function ($scope, $document, $state, $timeout, userCookie, appConstants) {
            userCookie.eraseCookie('authToken');
            $scope.getCourses = function () {
                return appConstants.courseList;
            };

            var authToken = userCookie.readCookie('authToken');
            if (angular.isDefined(authToken) && authToken != null) {
                $scope.authorized = true;
                $scope.availableCourses = $scope.getCourses();
            }


            $scope.login = function () {
                $scope.loading = true;

                $scope.authorized = false;

                $timeout(function () {
                    $scope.loading = false;
                    if ($scope.validate()) {
                        userCookie.createCookie('authToken', btoa($scope.username + ':' + $scope.password), appConstants.cookieTimeoutMinutes);
                        $scope.authorized = true;
                        $scope.availableCourses = $scope.getCourses();
                    } else {
                        userCookie.eraseCookie('authToken');
                        $scope.authorized = false;
                    }
                }, 3000);
            };


            $scope.validate = function () {
                return true;
            };


            $scope.selectCourse = function (courseId, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                $state.go(appConstants.courseList[courseId]);
            }
        }]);

