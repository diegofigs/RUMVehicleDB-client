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
        templateUrl: 'views/pages/login.html?v='+window.appVersion,
        controller: 'LoginCtrl'
    })
    .state('signup', {
        url: '/signup',
        parent: 'base',
        templateUrl: 'views/pages/signup.html?v='+window.appVersion,
        controller: 'LoginCtrl'
    });
})
.controller('LoginCtrl', function($scope, $location, $timeout, $q) {

    $scope.submit = function() {
        return false;
    };

    $scope.authenticate = function() {
        var defer = $q.defer();
        $timeout(function(){
            defer.resolve();
            $timeout(function(){
               $location.path('/dashboard/home');
           }, 600);
        }, 1100);
        return defer.promise;
    };

});
