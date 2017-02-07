'use strict';

/**
* @ngdoc overview
* @name MaterialApp
* @description
* # MaterialApp
*
* Main module of the application.
*/
window.appVersion = 2.0;

angular
.module('MaterialApp', [
    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'ngStorage',
    'chart.js',
    'gridshore.c3js.chart',
    'angular-growl',
    'growlNotifications',
    'angular-loading-bar',
    'easypiechart',
    'ui.sortable',
    'bootstrapLightbox',
    'materialCalendar',
    'paperCollapse',
    'pascalprecht.translate',
    'ng-mfb'
    ])
    // .constant('BACKEND_SERVER', 'http://dev.uprm.edu/guardia/CAAMpusInfractionAPI/public/api/v1/')
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.latencyThreshold = 5;
      cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(function($translateProvider) {
      $translateProvider.useStaticFilesLoader({
          prefix: 'languages/',
          suffix: '.json'
        });
      $translateProvider.useSanitizeValueStrategy(null);
      $translateProvider.preferredLanguage('en');
    })
    .config(['$mdIconProvider', function($mdIconProvider) {
      $mdIconProvider
        .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
        .defaultIconSet('img/icons/sets/core-icons.svg', 24);
    }])
    .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.when('/dashboard', '/dashboard/home');
      $urlRouterProvider.otherwise('/dashboard/home');

      $stateProvider
        .state('base', {
          abstract: true,
          url: '',
          templateUrl: 'views/base.html?v=' + window.appVersion,
          controller: 'DashboardCtrl'
        })
        .state('404', {
          url: '/404-page',
          parent: 'base',
          templateUrl: 'views/pages/404-page.html?v=' + window.appVersion
        });
    });

