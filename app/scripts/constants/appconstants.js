'use strict';

angular.module('mooc')
    .constant('appConstants',
        {
            cookieTimeoutMinutes : 30,
            debugMode:true,
            courseList:[
                'P2P',
                'LTTO',
                'PMed-001',
                'Introse',
                'Introse-002'
            ]
        }
    );
