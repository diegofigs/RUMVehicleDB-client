'use strict';

/**
 * @ngdoc function
 * @name MaterialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of MaterialApp
 */
window.appVersion = 2.0;
angular.module('MaterialApp')
.config(function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      parent: 'base',
      templateUrl: 'views/pages/login.html?v=' + window.appVersion,
      controller: 'LoginCtrl'
    })
    .state('signup', {
      url: '/signup',
      parent: 'base',
      templateUrl: 'views/pages/signup.html?v=' + window.appVersion,
      controller: 'LoginCtrl'
    });
})
.controller('LoginCtrl', function($scope, $state, $log, AuthService) {

  $scope.login = function() {
    return AuthService.authenticate($scope.user)
      .then(function() {
        $state.go('dashboard');
      }).catch(function(error) {
      $log.log(error);
    });
  };

});
