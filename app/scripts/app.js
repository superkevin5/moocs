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
            .state('course', {
                url: '/dashboard/:courseName',
                templateUrl: 'views/course_home.html',
                controller: 'DashboardCtrl'
            })
            .state('singleview', {
                url: '/singleview/:courseName/:page',
                templateUrl: 'views/single_view.html',
                controller: 'SingleViewCtrl'
            })
            .state('manual', {
                url: '/manual/:courseName',
                templateUrl: 'views/manual.html',
                controller: 'ManualCtrl'
            })


    })
    .run(['$rootScope', '$state', '$stateParams','$cookies','$http','appConstants','$window',
        function ($rootScope, $state, $stateParams,$cookies,$http,appConstants,$window) {

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

            $rootScope.$on('$locationChangeStart', function($event, changeTo, changeFrom) {


                if (changeTo == changeFrom) {
                    return;
                }

                //if(changeFrom.includes('dashboard') && changeTo.includes('singleview')) {
                    window.location.assign(changeTo);
                    window.location.reload(true);
                //}
            });

        }]);
