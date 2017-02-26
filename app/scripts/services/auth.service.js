/**
 * Created by diegofigs on 1/30/17.
 */
(function() {
  'use strict';
  angular.module('MaterialApp')
    .factory('AuthService', function($http, $log, $sessionStorage) {
      var baseDomain = 'http://67.205.175.113/api/v1';
      var auth = {};
      auth.authenticate = function(user) {
        return $http.post(baseDomain + '/auth', user)
          .then(function(response) {
            $log.log(response.data.token);
            $sessionStorage.token = response.data.token;
            return $http.get(baseDomain + '/auth/me', {
              headers: {
                Authorization: 'Bearer ' + $sessionStorage.token
              }
            }).then(function(response) {
              $log.log(response.data.data);
              $sessionStorage.user = response.data.data;
              return $sessionStorage.user;
            });
          })
          .catch(function(error) {
            $log.log(error);
          });
      };
      auth.logOut = function() {
        delete $sessionStorage.token;
        delete $sessionStorage.user;
      };
      auth.getToken = function() {
        if (auth.isLoggedIn()) {
          return $sessionStorage.token;
        }
        return null;
      };
      auth.getUser = function() {
        if (auth.isLoggedIn()) {
          return $sessionStorage.user;
        }
        return null;
      };
      auth.isLoggedIn = function() {
        return $sessionStorage.token !== null;
      };
      return auth;
    });
}());
