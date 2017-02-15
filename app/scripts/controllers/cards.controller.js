/**
 * Created by diegofigs on 1/31/17.
 */
'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('cards', {
        url: '/cards',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/cards/cards.html?v=' + window.appVersion,
        controller: 'CardsCtrl',
        resolve: {
          cards: function(CardsService) {
            return CardsService.getCards();
          }
        }
      })
      .state('cards.add', {
        url: '/cards/add',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/cards/add-card.html?v=' + window.appVersion,
        controller: 'CardsCtrl'
      })
      .state('cards.view', {
        url: '/cards/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/cards/view-card.html?v=' + window.appVersion,
        controller: 'CardsCtrl',
        controllerAs: 'vm'
      })
      .state('cards.edit', {
        url: '/cards/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/cards/edit-card.html?v=' + window.appVersion,
        controller: 'CardsCtrl'
      });
  })
  .controller('CardsCtrl', function($scope, $state, $log, CardsService) {
    $scope.cards = CardsService.cards;
    $scope.createCard = function() {
      return CardsService.createCard($scope.card).then(function(response) {
        $log.log(response);
        $state.go('cards');
      });
    };
    $scope.deleteCard = function(card) {
      return CardsService.deleteCard(card).then(function(response) {
        $log.log(response);
        $state.reload();
      });
    };
    $scope.editCard = function(card) {
      return CardsService.editCard(card).then(function(response) {
        $log.log(response);
        $state.go('cards');
      });
    };
  });
