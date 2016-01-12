'use strict';

angular.module('mooc')
    .constant('appConstants',
        {
            cookieTimeoutMinutes : 30,
            debugMode:true,
            courseList:{
                0:'P2P',
                1:'LTTO',
                2:'PMed-001',
                3:'Introse',
                4:'Introse-002'
            }
        }
    );
