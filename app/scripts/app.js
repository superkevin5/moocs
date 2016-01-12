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
        'ngAnimate',
        'ngCookies'
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
            .state('P2P', {
                url: '/p2pdashboard',
                templateUrl: 'P2P/P2P_home.html'
                //controller: 'DashboardCtrl'
            })
            .state('Introse', {
                url: '/introsedashboard',
                templateUrl: 'Introse/INTSE_home.html'
                //controller: 'DashboardCtrl'
            })
            .state('LTTO', {
                url: '/lttodashboard',
                templateUrl: 'LTTO/LTTO_home.html'
                //controller: 'DashboardCtrl'
            })
            .state('PMed-001', {
                url: '/pmeddashboard',
                templateUrl: 'PMed-001/PMed_home.html'
                //controller: 'DashboardCtrl'
            })
            .state('Introse-002', {
                url: '/introse2dashboard',
                templateUrl: 'Introse-002/INTSE2_home.html'
                //controller: 'DashboardCtrl'
            })

    })
    .run(['$rootScope', '$state', '$stateParams','$cookies','$http','appConstants',
        function ($rootScope, $state, $stateParams,$cookies,$http,appConstants) {

            $rootScope.debugMode = appConstants.debugMode;

            //$rootScope.globals = $cookies.get('globals') || {};
            //if ($rootScope.globals.currentUser) {
            //    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            //}

            //$rootScope.$on('$locationChangeStart', function (event, next, current) {
            //    // redirect to login page if not logged in
            //    if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            //        $state.go('login');
            //    }
            //});
        }]);
