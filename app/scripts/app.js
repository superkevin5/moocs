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
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {

    //$urlRouterProvider.when('/dashboard', '/dashboard/overview');
    //  $locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //  });
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
          templateUrl: 'views/login.html'
          //controller: 'LoginCtrl'
        });
        //.state('dashboard', {
        //  url: '/dashboard',
        //  parent: 'base',
        //  templateUrl: 'views/dashboard.html',
        //  controller: 'DashboardCtrl'
        //})
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
