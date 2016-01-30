'use strict';

angular.module('mooc')
    .constant('appConstants',
        {
            cookieTimeoutMinutes : 30,
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
