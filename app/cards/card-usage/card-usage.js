
import cardsUsageController from './card-usage.controller';
import cardUsageService from './card-usage.service';

import cardUsageTemplate from './card-usage.html';
import cardUsageFormTemplate from './views/add-card-usage.html';

const cardUsageModule = angular.module('app.cards.card-usage', [])
  .config(function ($stateProvider) {

    $stateProvider
      .state('dashboard.cards.view.card-usage', {
        url: '/card-usage',
        template: cardUsageTemplate,
        controller: 'cardsUsageCtrl as ctrl',
        resolve: {
          singleCardUsages: ($stateParams,CardUsageService) =>
          CardUsageService.getSingleCardUsages($stateParams.id),
          card: ($stateParams, CardsService) => CardsService.getCard($stateParams.id),
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

  })
  .service('CardUsageService', cardUsageService)
  .controller('cardsUsageCtrl', cardsUsageController)
  .name;

/**
 * CardUsage module is in charge of encapsulating all functionality
 * related to card expenses inside the application.
 * This angular module declares all states from the card-usage
 * sub tree of views.
 * @type {string}
 * @return {string} 'app.cards.card-usage'
 */
export default cardUsageModule;
