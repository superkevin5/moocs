'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
    .module('mooc', [
        'ui.router',
        'ngAnimate'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        //$urlRouterProvider.when('/dashboard', '/dashboard/overview');
        //$locationProvider.html5Mode({enabled: true, requireBase: true});
        //$locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('base', {
                abstract: true,
                url: '',
                templateUrl: 'views/base.html'
            })
            .state('login', {
                url: '/login',
                parent: 'base',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('p2pdashboard', {
                url: '/p2pdashboard',
                templateUrl: 'P2P/P2P_home.html'
                //controller: 'DashboardCtrl'
            })
            .state('introsedashboard', {
                url: '/introsedashboard',
                templateUrl: 'Introse/INTSE_home.html'
                //controller: 'DashboardCtrl'
            })
            .state('lttodashboard', {
                url: '/lttodashboard',
                templateUrl: 'LTTO/LTTO_home.html'
                //controller: 'DashboardCtrl'
            })
            .state('pmeddashboard', {
                url: '/pmeddashboard',
                templateUrl: 'PMed-001/PMed_home.html'
                //controller: 'DashboardCtrl'
            })
            .state('introse2dashboard', {
                url: '/introse2dashboard',
                templateUrl: 'Introse-002/INTSE2_home.html'
                //controller: 'DashboardCtrl'
            });
        //  .state('overview', {
        //    url: '/overview',
        //    parent: 'dashboard',
        //    templateUrl: 'views/dashboard/overview.html'
        //  })
        //  .state('reports', {
        //    url: '/reports',
        //    parent: 'dashboard',
        //    templateUrl: 'views/dashboard/reports.html'
        //  });

    });
