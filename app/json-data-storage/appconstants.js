'use strict';

angular.module('mooc')
    .constant('appConstants',
        {
            appPathIngoogleDrive:'../../',
            cookieTimeoutMinutes : 30,
            isCookieEnabled:false,
            isIframe:true,
            debugMode:false,
            courseList:[
                'P2P',
                'LTTO',
                'PMed-001',
                'Introse',
                'Introse-002'
            ]
        }
    );
