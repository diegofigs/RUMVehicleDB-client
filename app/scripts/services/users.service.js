/**
 * Created by diegofigs on 1/31/17.
 */
'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .factory('UsersService', function($http, $log) {
    var baseDomain = 'http://67.205.161.165/api/v1';
    var user = {
      users: []
    };
    user.getUsers = function() {
      return $http.get(baseDomain + '/users')
        .then(function(response) {
          user.users = response.data.data;
          $log.log(response.data.data);
          return response.data.data;
        })
        .catch(function(error) {
          $log.log(error);
        });
    };
    user.createUser = function(user) {
      return $http.post(baseDomain + '/users', user)
        .then(function(response) {
          $log.log(response);
        })
        .catch(function(error) {
          $log.log(error);
        });
    };
    user.deleteUser = function(user) {
      return $http.delete(baseDomain + '/users/' + user.id)
        .then(function(response) {
          $log.log(response);
        })
        .catch(function(error) {
          $log.log(error);
        });
    };
    user.getCurrentUsers = function() {
      return user.users;
    };
    return user;
  });
