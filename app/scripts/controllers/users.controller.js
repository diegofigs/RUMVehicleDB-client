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
      controller: 'UsersCtrl',
    });
  })
  .controller('UsersCtrl', function($scope, $state, $log, UsersService) {
    $scope.users = UsersService.getCurrentUsers();
    $scope.createUser = function() {
      return UsersService.createUser($scope.user).then(function(response) {
        $log.log(response);
      });
    };
    $scope.deleteUser = function(user) {
      return UsersService.deleteUser(user).then(function(response) {
        $log.log(response);
      });
    };
  });
