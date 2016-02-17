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
                var windows = window.open("","formresult",'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=0, top=0, width=200, height=200, visible=none', '');
                document.search.submit();
                setTimeout(function(){
                    windows.close();
                },8000);
            }
        };
        return myDirective;
    });
