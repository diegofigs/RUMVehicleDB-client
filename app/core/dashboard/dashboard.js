import baseTemplate from '../base.html';
import errorTemplate from '../404.html';
import dashboardTemplate from './dashboard.html';
import dashboardController from './dashboard.controller';
import homeTemplate from './home/home.html';
import homeController from './home/home.controller';
import statsService from './services/stats.service';

/** @ngInject */
const dashboardModule = angular.module('core.dashboard', [])
  // Declare module elements
  .controller('DashboardCtrl', dashboardController)
  .controller('HomeCtrl', homeController)
  .service('StatsService', statsService)
  // Config block for state declaration
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        template: baseTemplate,
      })
      .state('dashboard', {
        abstract: true,
        url: '/dashboard',
        parent: 'base',
        template: dashboardTemplate,
        controller: 'DashboardCtrl as ctrl',
        resolve: {
          redirectUnauthorized: ($q, $state, $timeout, AuthService) => {
            let deferred = $q.defer();
            if(AuthService.isLoggedIn())
              deferred.resolve();
            else {
              $timeout(() => $state.go('login'));
              deferred.reject();
            }
            return deferred.promise.catch(() => {});
          }
        }
      })
      .state('dashboard.home', {
        url: '/home',
        template: homeTemplate,
        controller: 'HomeCtrl as ctrl',
        resolve: {
          dashboardStats: (StatsService) =>
            StatsService.getDashboardStats(),
        }

      })
      .state('404', {
        url: '/404',
        template: errorTemplate,
        controller: 'DashboardCtrl as ctrl',
      });

    $urlRouterProvider.when('/dashboard', '/dashboard/home');
    $urlRouterProvider.otherwise('/404');
  }).name;

/**
 * Dashboard is in charge of providing an accessible menu interface
 * for the user at all times and encapsulating this functionality.
 * @type {string}
 * @return {string} 'core.dashboard'
 */
export default dashboardModule;
