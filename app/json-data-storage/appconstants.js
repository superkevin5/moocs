'use strict';

angular.module('mooc')
    .constant('appConstants',
        {
            appPathIngoogleDrive:'../../',
            cookieTimeoutMinutes : 30,
            isCookieEnabled:true,
            isIframe:false,
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
