'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .factory('CardsService', function($http, $log, AuthService) {
    var baseDomain = 'http://67.205.175.113/api/v1';
    var resource = '/cards';
    var card = {
      cards: []
    };
    card.getCards = function() {
      card.cards = $http.get(baseDomain + resource, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).then(function(response) {
          card.cards = response.data.data;
          return response.data.data;
        })
        .catch(function(error) {
          $log.log(error);
        });
      return card.cards;
    };
    card.createCard = function(card) {
      return $http.post(baseDomain + resource, card, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
          $log.log(error);
        });
    };
    card.deleteCard = function(card) {
      return $http.delete(baseDomain + resource + '/' + card.id, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
          $log.log(error);
        });
    };
    card.editCard = function(card) {
      return $http.put(baseDomain + resource + '/' + card.id, card, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
          $log.log(error);
        });
    };
    return card;
  });
