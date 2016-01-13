/**
 * Created by kevin on 12/15/2015.
 */

'use strict';

angular
    .module('mooc')
    .controller('DashboardCtrl', ['$scope', '$stateParams', '$document', '$state', '$timeout', 'userCookie', 'appConstants',
        function ($scope, $stateParams, $document, $state, $timeout, userCookie, appConstants) {
            $scope.courseType = $state.current.name;










        }]);

