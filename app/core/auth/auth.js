/**
 * Created by diegofigs on 2/27/17.
 */
import authController from './auth.controller';
import authService from './auth.service';
import signupTemplate from './views/signup.html';
import loginTemplate from './views/login.html';

/** @ngInject */
const authModule = angular.module('core.auth', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        parent: 'base',
        template: loginTemplate,
        controller: 'AuthCtrl as ctrl',
      })
      .state('signup', {
        url: '/signup',
        parent: 'base',
        template: signupTemplate,
        controller: 'AuthCtrl as ctrl',
      });
  })
  .service('AuthService', authService)
  .controller('AuthCtrl', authController)
  .name;

export default authModule;
