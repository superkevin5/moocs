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
        'ngCookies',
        'ui.bootstrap'
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
            .state('dash', {
                url: '/dash/:courseName',
                templateUrl: 'views/dash.html',
                controller: 'DashboardCtrl'
            })
            .state('dash.single', {
                url: '/singleview/:courseName/:page',
                templateUrl: 'views/single_view.html',
                controller: 'SingleViewCtrl'
            })
            .state('dash.home', {
                url: '/home',
                templateUrl: 'views/course_home.html',
                controller: 'HomeCtrl'
            })
            .state('dash.manual', {
                url: '/manual',
                templateUrl: 'views/manual.html',
                controller: 'ManualCtrl'
            })
    })
    .run(['$rootScope', '$state', '$stateParams', '$cookies', '$http', 'appConstants', '$window', '$timeout',
        function ($rootScope, $state, $stateParams, $cookies, $http, appConstants, $window, $timeout) {
            $rootScope.debugMode = appConstants.debugMode;

            $rootScope.appPath = appConstants.appPathIngoogleDrive;

            $rootScope.$on('$locationChangeStart', function ($event, changeTo, changeFrom) {
                $timeout(function () {
                    $.sidr('close', 'sidr');
                });
            });

            $rootScope.$on('$locationChangeSuccess', function() {
                $rootScope.showhelp = false;
            });


        }]);
