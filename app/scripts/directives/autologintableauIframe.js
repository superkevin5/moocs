/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .directive('autoLoginIframe', function () {
        var myDirective = {
            restrict: 'E',
            template:'<iframe ng-src="../../views/iframeTemplate.html" id="kevin"></iframe>',
            link: function ($scope, iElm, iAttrs, controller) {




                //var childWindow = window.open('', 'formresult');
                //var windows = window.open("","formresult",'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=0, top=0, width=200, height=200, visible=none', '');





                setTimeout(function(){
                    var ifr = document.getElementById( "kevin");
                    console.log(ifr);





                    var ifrDoc = (ifr.contentWindow  || ifr.contentDocument);
                    if (ifrDoc.document) ifrDoc = ifrDoc.document;
                    console.log(ifrDoc);




                    //ifrDoc.getElementById( "loginIntoTableau").click();

                    var theForm = ifrDoc.getElementById( "search-iframe" );
                    theForm.submit();


                },3000);







                //document.getElementById("hidden-auto-iframe").;
                //document.hiddeniframe.document.getElementById("search-iframe").submit();
                //console.log('iframeLogin');


                //function close() {
                //    document.querySelector('#hidden-auto-iframe').addEventListener('load', function() {
                //        window.close();
                //    });
                //}

            }
        };
        return myDirective;
    });