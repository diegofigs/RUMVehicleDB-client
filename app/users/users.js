import usersController from '../users/users.controller';
import usersService from '../users/users.service';

import baseTemplate from '../core/base.html';
import usersTemplate from '../users/users.html';
import usersAddTemplate from '../users/views/add-user.html';
import usersEditTemplate from '../users/views/edit-user.html';

/** @ngInject */
const usersModule = angular.module('app.users', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        abstract: true,
        url: '/users',
        template: baseTemplate,
      })
      .state('dashboard.users.list', {
        url: '/list',
        template: usersTemplate,
        controller: 'UsersCtrl as ctrl',
        resolve: {
          users: function(UsersService) {
            let isActive = {is_active: 1};
            return UsersService.getUsers(isActive);
          },
          departments: (DepartmentsService) =>
            DepartmentsService.getDepartments(),
          userTypes: (UsersService) =>
            UsersService.getUserTypes(),
        }
      })
      .state('dashboard.users.add', {
        url: '/add',
        template: usersAddTemplate,
        controller: 'UsersCtrl as ctrl',
        resolve: {
          departments: (DepartmentsService) =>
            DepartmentsService.getDepartments(),
          userTypes: (UsersService) =>
            UsersService.getUserTypes()
        }
      })
      .state('dashboard.users.edit', {
        url: '/:id/edit',
        template: usersEditTemplate,
        controller: 'UsersCtrl as ctrl',
        resolve: {
          user: ($stateParams, UsersService) =>
            UsersService.getUser($stateParams.id),
          departments: (DepartmentsService) =>
            DepartmentsService.getDepartments(),
          userTypes: (UsersService) =>
            UsersService.getUserTypes()
        },
      });
  })
  .service('UsersService', usersService)
  .controller('UsersCtrl', usersController)
  .name;

/**
 * Users is in charge of encapsulating all functionality
 * related to users inside the application.
 * @type {string}
 * @return {string} 'app.users'
 */
export default usersModule;
