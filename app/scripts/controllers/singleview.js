/**
 * Created by kevin on 12/15/2015.
 */

'use strict';

angular
    .module('mooc')
    .controller('SingleViewCtrl', ['$scope','$window', '$stateParams', '$document', '$state', '$timeout', 'userCookie', 'appConstants', '$http', 'CourseDataService',
        function ($scope,$window, $stateParams, $document, $state, $timeout, userCookie, appConstants, $http, CourseDataService) {


            //$window.location.reload();

            $scope.viewtype = $stateParams.page;
            console.log($stateParams.page);


        }]);

