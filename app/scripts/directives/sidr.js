/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .directive('toggleSidrMenu', function () {
        var myDirective = {
            restrict: 'A',
            link: function ($scope, iElm, iAttrs, controller) {
                iElm.sidr(
                    {
                        side: 'right'
                    }
                );
            }
        };
        return myDirective;
    })
    .directive('sidrMenu', function () {
        var myDir = {
            restrict: 'A',
            compile: function (element) {
                element.attr('id', 'sidr');
            }
        };
        return myDir;
    });
