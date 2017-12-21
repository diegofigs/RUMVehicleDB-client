import authController from './auth.controller';
import authService from './auth.service';
import loginTemplate from './views/login.html';

/** @ngInject */
const authModule = angular.module('app.core.auth', [
  'ui.router', 'ngStorage'])
  // Config block for state declaration
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // Login state
      .state('login', {
        url: '/login',
        parent: 'base',
        template: loginTemplate,
        controller: 'AuthCtrl as ctrl',
        resolve: {
          redirectAuthorized: ($q, $state, $timeout, AuthService) => {
            let deferred = $q.defer();
            if(!AuthService.isLoggedIn())
              deferred.resolve();
            else {
              $timeout(() => $state.go('dashboard.home'));
              deferred.reject();
            }
            return deferred.promise.catch(() => {});
          }
        }
      });

      $urlRouterProvider.when('/', '/login');
      $urlRouterProvider.when('', '/login');
  })
  // Declare module elements
  .service('AuthService', authService)
  .controller('AuthCtrl', authController)
  // Return module name string for portability
  .name;

/**
 * Auth is in charge of encapsulating all functionality
 * related to authentication and security measures inside the application.
 * This angular module declares all states from the login portal.
 * @type {string}
 * @return {string} 'app.core.auth'
 */
export default authModule;
