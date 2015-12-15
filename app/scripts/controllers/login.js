/**
 * Created by kevin on 12/15/2015.
 */


'use strict';

angular
    .module('mooc')
    .controller('LoginCtrl', ['$scope','$document','$state',
        function ($scope,$document,$state) {

            $scope.login = function(){



                var courseValue = angular.element($document[0].querySelector('#courseselect')).val();



                console.log(courseValue);
                switch(courseValue){
                    case 'p2p' :$state.go('p2pdashboard');
                        break;
                    case 'introse' :$state.go('introsedashboard');
                        break;
                    case 'introse-002' :$state.go('introse2dashboard');
                        break;
                    case 'ltto' :$state.go('lttodashboard');
                        break;
                    case 'pmed-001' :$state.go('pmeddashboard');
                        break;

                }



            }







        }]);

