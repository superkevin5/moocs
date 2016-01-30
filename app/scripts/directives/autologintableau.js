/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .directive('autoLogin', function () {
        var myDirective = {
            restrict: 'E',
            template: '<form id="search" name="search" action="https://sso.online.tableau.com/public/prelogin/sendPassword?messageId=" method="post" target="formresult" ng-show="false"> <input name="email" value="unswmooc2@gmail.com"/>'+
            '<input name="password" value="n0Password"/>'+
            '<input type="submit" id="loginIntoTableau">'+
            '</form>',
            link: function ($scope, iElm, iAttrs, controller) {
              //var childWindow = window.open('', 'formresult');
              var windows = window.open("","formresult","width=500,height=300,toolbar=0");
              document.search.submit();

              setTimeout(function(){
                windows.close();
              },5000);


            }
        };
        return myDirective;
    });
