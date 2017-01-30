/**
 * Created by diegofigs on 1/30/17.
 */
(function() {
  'use strict';
  angular.module('MaterialApp')
    .factory('AuthService', function($http, $log) {
      var auth = {
        token: ''
      };
      auth.authenticate = function(user) {
        return $http.post('http://67.205.161.165/auth', user)
          .then(function(response) {
            auth.token = response.data.token;
            return auth.token;
          })
          .catch(function(error) {
            $log.log(error);
          });
      };
      auth.getToken = function() {
        if (auth.isLoggedIn()) {
          return auth.token;
        }
        return null;
      };
      auth.isLoggedIn = function() {
        if (auth.token !== '') {
          return true;
        }
        return false;
      };
      return auth;
    });
}());
