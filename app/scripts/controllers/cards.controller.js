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
        controller: 'CardsCtrl',
        resolve: {
          departments: function(DepartmentsService) {
            return DepartmentsService.getDepartments();
          }
        }
      })
      .state('cards.view', {
        url: '/cards/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/cards/view-card.html?v=' + window.appVersion,
        controller: 'CardsCtrl',
        resolve: {
          card: function($stateParams, CardsService) {
            return CardsService.getCard($stateParams.id);
          }
        }
      })
      .state('cards.edit', {
        url: '/cards/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/cards/edit-card.html?v=' + window.appVersion,
        controller: 'CardsCtrl',
        resolve: {
          card: function($stateParams, CardsService) {
            return CardsService.getCard($stateParams.id);
          },
          departments: function(DepartmentsService) {
            return DepartmentsService.getDepartments();
          }
        }
      });
  })
  .controller('CardsCtrl',
    function($scope, $state, $log,
    AuthService, CardsService, DepartmentsService) {
    $scope.cards = CardsService.cards;
    $scope.card = CardsService.card;
    $scope.departments = DepartmentsService.departments;
    $scope.newCard = {};
    $scope.createCard = function() {
      $scope.newCard.custodian_id = AuthService.getUser().id;
      $log.log($scope.newCard);
      return CardsService.createCard($scope.newCard).then(function(response) {
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
    $scope.editCard = function() {
      return CardsService.editCard($scope.card).then(function(response) {
        $log.log(response);
        $state.go('cards');
      });
    };
  });
