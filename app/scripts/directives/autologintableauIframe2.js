/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .directive('autoLoginIframe2', function () {
        var myDirective = {
            restrict: 'E',
            template:'<iframe ng-src="https://auth.tableausoftware.com/user/login" id="kevin2"></iframe>',
            link: function ($scope, iElm, iAttrs, controller) {









            }
        };
        return myDirective;
    });