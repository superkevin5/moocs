/**
 * Created by khu on 11/17/2014.
 */
'use strict';

angular.module('mooc')
    .factory('userCookie', function () {
        return {
            createCookie:function(name,value,minutes){
                var expires='';
                if (minutes) {
                    var date = new Date();
                    date.setTime(date.getTime()+(minutes*60*1000));
                    expires = '; expires='+date.toGMTString();
                }
                document.cookie = name+'='+value+expires+'; path=/';
            },
            eraseCookie:function(name){
                this.createCookie(name,'',-1);
            },
            readCookie:function(name){
                var nameEQ = name + '=';
                var ca = document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0)=== ' ') {
                        c = c.substring(1,c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length,c.length);
                    }
                }
                return null;
            }
        };
    });