

import cardsUsageController from './card-usage.controller';
import cardUsageService from './card-usage.service';

import cardUsageTemplate from './card-usage.html';
import cardUsageFormTemplate from './views/add-card-usage.html';
import cardUsageEditTemplate from './views/edit-card-usage.html';

const cardUsageModule = angular.module('app.cards.card-usage', [])
  .config(function ($stateProvider) {

    $stateProvider
      .state('dashboard.cards.view.card-usage', {
        url: '/card-usage',
        template: cardUsageTemplate,
        controller: 'cardsUsageCtrl as ctrl',
        resolve: {
          cardUsage: ($stateParams, CardUsageService) =>
            CardUsageService.getCardUsages($stateParams.id),
        },
      })
      .state('dashboard.cards.view.add-usage', {
        url: '/card-usage/add',
        template: cardUsageFormTemplate,
        controller: 'cardsUsageCtrl as ctrl',
        resolve: {
          card: ($stateParams, CardsService) => CardsService.getCard($stateParams.id),
        },
      })
      .state('dashboard.cards.view.edit-card-usage', {
        url: '/:id/edit',
        template: cardUsageEditTemplate,
        controller: 'cardsUsageCtrl as ctrl',
        resolve: {
          cardUsage: ($stateParams, CardUsageService) =>
            CardUsageService.getCardUsages($stateParams.id),
        },
      });

  })
  .service('CardUsageService', cardUsageService)
  .controller('cardsUsageCtrl', cardsUsageController)
  .name;

export default cardUsageModule;
