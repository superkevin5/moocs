/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .directive('moocTableau', function () {
        var myDirective = {
            restrict: 'E',
            template: '<uib-alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</uib-alert><div id="tableauViz"></div>',
            scope: {
                page: '=',
                mooc: '=',
                viz: '='
            },
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.alerts = [];
                $scope.initializeViz = function (url) {
                    var placeholderDiv = iElm[0].querySelector('#tableauViz');
                    var options = {
                        width: placeholderDiv.offsetWidth,
                        height: placeholderDiv.offsetHeight,
                        hideTabs: false,
                        hideToolbar: true,
                        onFirstInteractive: function () {
                            var workbook = viz.getWorkbook();
                            var activeSheet = workbook.getActiveSheet();
                        }
                    };
                    $scope.viz = new tableau.Viz(placeholderDiv, url, options);
                };

                $scope.closeAlert = function (index) {
                    $scope.alerts.splice(index, 1);
                };

                $scope.$watch('mooc', function (value) {
                    if (value) {
                        var url = '';
                        var keys = Object.keys($scope.mooc);
                        for (var i = 0, length = keys.length; i < keys.length; i++) {
                            var key = keys[i];
                            if (Array.isArray($scope.mooc[key])) {
                                var section = $scope.mooc[key];
                                for (var y = 0, length = section.length; y < section.length; y++) {
                                    if (angular.isDefined(section[y].Link) && angular.isDefined(section[y].page) && (typeof section[y].page === 'string' || section[y].page instanceof String) && section[y].page.includes($scope.page)) {
                                        url = section[y].Link;
                                    }
                                    else if (angular.isDefined(section[y].link) && angular.isDefined(section[y].page) && (typeof section[y].page === 'string' || section[y].page instanceof String) && section[y].page.includes($scope.page)) {
                                        url = section[y].link;
                                    }
                                }
                            }
                        }

                        if (angular.isUndefined(url) || url === null || url === '') {
                            $scope.alerts.push(
                                {
                                    type: 'danger',
                                    msg: 'Invalid tableau URL'
                                }
                            );
                        } else {
                            console.log(url);
                            $scope.initializeViz(url);
                        }
                    }
                }, true);
            }
        };
        return myDirective;
    });
