/**
 * Created by diegofigs on 1/31/17.
 */
'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .factory('UsersService', function($http, $log, AuthService) {
    var baseDomain = 'http://67.205.161.165/api/v1';
    var user = {
      users: []
    };
    user.getUsers = function() {
      user.users = $http.get(baseDomain + '/users')
        .then(function(response) {
          user.users = response.data.data;
          return response.data.data;
        })
        .catch(function(error) {
          $log.log(error);
        });
      return user.users;
    };
    user.createUser = function(user) {
      return $http.post(baseDomain + '/users', user)
        .catch(function(error) {
          $log.log(error);
        });
    };
    user.deleteUser = function(user) {
      return $http.delete(baseDomain + '/users/' + user.id, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
          $log.log(error);
        });
    };
    user.editUser = function(user) {
      return $http.put(baseDomain + '/users/' + user.id, user, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
          $log.log(error);
        });
    };
    return user;
  });
