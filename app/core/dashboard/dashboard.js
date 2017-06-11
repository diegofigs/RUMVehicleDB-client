import baseTemplate from '../base.html';
import errorTemplate from '../404.html';
import dashboardTemplate from './dashboard.html';
import dashboardController from './dashboard.controller';
import homeTemplate from './home/home.html';
import homeController from './home/home.controller';
import profileTemplate from './profile/profile.html';
import profileController from './profile/profile.controller';

/** @ngInject */
const dashboardModule = angular.module('core.dashboard', [])
  .controller('DashboardCtrl', dashboardController)
  .controller('HomeCtrl', homeController)
  .controller('ProfileCtrl', profileController)
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        template: baseTemplate,
      })
      .state('404', {
        url: '/404',
        template: errorTemplate,
        controller: 'DashboardCtrl as ctrl',
      })
      .state('dashboard', {
        url: '/dashboard',
        template: dashboardTemplate,
        controller: 'DashboardCtrl as ctrl',
      })
      .state('dashboard.home', {
        url: '/home',
        template: homeTemplate,
        controller: 'HomeCtrl as ctrl',
      })
      .state('dashboard.profile', {
        url: '/profile',
        template: profileTemplate,
        controller: 'ProfileCtrl as ctrl',
      });

    $urlRouterProvider.when('/dashboard', '/dashboard/home');
    $urlRouterProvider.when('/', '/dashboard/home');
    $urlRouterProvider.when('', '/dashboard/home');
    $urlRouterProvider.otherwise('/404');
  }).name;

export default dashboardModule;
