/**
 * Created by diegofigs on 1/31/17.
 */
'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .factory('UsersService', function($http, $log, AuthService) {
    var baseDomain = 'http://67.205.161.165/api/v1';
    var resource = '/users';
    var user = {
      users: []
    };
    user.getUsers = function() {
      user.users = $http.get(baseDomain + resource)
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
      return $http.post(baseDomain + resource, user)
        .catch(function(error) {
          $log.log(error);
        });
    };
    user.deleteUser = function(user) {
      return $http.delete(baseDomain + resource + '/' + user.id, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
          $log.log(error);
        });
    };
    user.editUser = function(user) {
      return $http.put(baseDomain + resource + '/' + user.id, user, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
          $log.log(error);
        });
    };
    return user;
  });
