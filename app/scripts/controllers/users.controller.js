/**
 * Created by diegofigs on 1/31/17.
 */
'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/users/users.html?v=' + window.appVersion,
        controller: 'UsersCtrl',
        resolve: {
          users: function(UsersService) {
            return UsersService.getUsers();
          }
        }
      }).state('users.add', {
        url: '/users/add',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/users/add-user.html?v=' + window.appVersion,
        controller: 'UsersCtrl'
      }).state('users.edit', {
        url: '/users/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/users/edit-user.html?v=' + window.appVersion,
        controller: 'UsersCtrl'
      });
  })
  .controller('UsersCtrl', function($scope, $state, $log, UsersService) {
    $scope.users = UsersService.users;
    $scope.createUser = function() {
      return UsersService.createUser($scope.user).then(function() {
        $state.go('users');
      });
    };
    $scope.deleteUser = function(user) {
      return UsersService.deleteUser(user).then(function() {
        $state.reload();
      });
    };
    $scope.editUser = function(user) {
      return UsersService.editUser(user).then(function() {
        $state.go('users');
      });
    };
  });
