/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .directive('autoLogin', function () {
        var myDirective = {
            restrict: 'E',
            template: '<form id="search" name="search" action="https://sso.online.tableau.com/public/prelogin/sendPassword?messageId=" method="post" target="_blank" ng-show="false"> <input name="email" value="unswmooc2@gmail.com"/>'+
            '<input name="password" value="n0Password"/>'+
            '<input type="submit" id="loginIntoTableau">'+
            '</form>',
            link: function ($scope, iElm, iAttrs, controller) {

              //var form = iElm[0].querySelector('#search');
              ////
              //
              //form.ajaxForm(function() {
              //  alert("Thank you for your comment!");
              //  window.close();
              //});

              //var closeSelf= function(f){
              //
              //  console.log('dddddddd');
              //
              //
              //  window.close();
              //};

              document.search.submit();


            }
        };
        return myDirective;
    });
