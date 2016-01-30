/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .directive('moocPie', function () {
        var myDirective = {
            restrict: 'A',
            link: function ($scope, iElm, iAttrs, controller) {
                    iElm.matchHeight();
            }
        };
        return myDirective;
    })
    .directive('moocMap', function () {
        var myDirective = {
            restrict: 'A',
            link: function ($scope, iElm, iAttrs, controller) {
                iElm.maphilight({
                    fillColor: '008800',
                    strokeColor: 'ffcc00'
                });
            }
        };
        return myDirective;
    });
