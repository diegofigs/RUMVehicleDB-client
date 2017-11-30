/**
 * Created by diegofigs on 2/27/17.
 */
import authController from './auth.controller';
import authService from './auth.service';
import signupTemplate from './views/signup.html';
import loginTemplate from './views/login.html';

/** @ngInject */
const authModule = angular.module('core.auth', [])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
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
      })
      .state('signup', {
        url: '/signup',
        parent: 'base',
        template: signupTemplate,
        controller: 'AuthCtrl as ctrl',
      });

      $urlRouterProvider.when('/', '/login');
      $urlRouterProvider.when('', '/login');
  })
  .service('AuthService', authService)
  .controller('AuthCtrl', authController)
  .name;

export default authModule;
