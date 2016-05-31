/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .directive('moocTableau', function ($timeout,$window) {
        var myDirective = {
            restrict: 'E',
            template: '<div ng-if="showCarousal">'+
            '<div class="carsousel tableauPlaceholder">'+
            '<uib-carousel interval="myInterval" no-wrap="noWrapSlides">'+
            '<uib-slide ng-repeat="slide in imageQueue">'+
            '<img ng-src="{{$root.appPath}}/images/carouseltemplate/{{slide}}">'+
            '</uib-slide>'+
            '</uib-carousel>'+
            '</div>'+
            '</div>'+
            '<div id="tableauViz" ng-if="!showCarousal" class="tableauPlaceholder"></div>',
            scope: {
                page: '=',
                mooc: '=',
                viz: '='
            },
            link: function ($scope, iElm, iAttrs, controller) {
                var urlTmp = undefined;
                var w = angular.element($window);
                w.resize(function(){
                    console.log('s');
                    if(angular.isDefined(urlTmp)){
                        $scope.viz.dispose();
                    $scope.initializeViz(urlTmp);
                        }
                });

                $scope.initializeViz = function (url) {
                    var placeholderDiv = iElm[0].querySelector('#tableauViz');
                    var options = {
                        width: placeholderDiv.clientWidth,
                        height: placeholderDiv.clientHeight,
                        hideTabs: false,
                        hideToolbar: false,
                        onFirstInteractive: function () {
                            var workbook = viz.getWorkbook();
                            var activeSheet = workbook.getActiveSheet();
                        }
                    };
                    $scope.viz = new tableau.Viz(placeholderDiv, url, options);

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
                                    if (angular.isDefined(section[y].Link) && angular.isDefined(section[y].page) && (typeof section[y].page === 'string' || section[y].page instanceof String) && section[y].page.indexOf($scope.page)!=-1) {
                                        url = section[y].Link;
                                    }
                                    else if (angular.isDefined(section[y].link) && angular.isDefined(section[y].page) && (typeof section[y].page === 'string' || section[y].page instanceof String) && section[y].page.indexOf($scope.page)!=-1) {
                                        url = section[y].link;
                                    }
                                }
                            }
                        }

                        if (angular.isUndefined(url) || url === null || url === '') {
                            $scope.showCarousal = true;
                            $scope.loadAllCarousal();
                        } else {
                            console.log(url);
                            $scope.showCarousal = false;
                            $scope.initializeViz(url);
                            urlTmp = url;
                        }
                    }
                }, true);

                $scope.loadAllCarousal = function(){
                    $scope.myInterval = 5000;
                    $scope.noWrapSlides = false;
                    //var slides = $scope.slides = [];
                    var currIndex = 0;

                    $scope.imageQueue = ['a.png','b.png','c.png','d.png','e.png','f.png','g.png','h.png','i.png','j.png','k.png','l.png','m.png'];
                };

                $scope.loadAllCarousal();

            }
        };
        return myDirective;
    });
