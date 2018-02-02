import cardsController from './cards.controller';
import cardsService from './cards.service';

import baseTemplate from '../core/base.html';
import cardsAddTemplate from './views/add-card.html';
import cardsEditTemplate from './views/edit-card.html';
import cardsViewTemplate from './views/view-card.html';
import cardsTemplate from './cards.html';
import cardUsageModule from './card-usage/card-usage.js';

/** @ngInject */
const cardsModule = angular.module('app.cards', [cardUsageModule])
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.cards', {
        abstract: true,
        url: '/cards',
        template: baseTemplate,
      })
      .state('dashboard.cards.list', {
        url: '/list',
        template: cardsTemplate,
        controller: 'CardsCtrl as ctrl',
        resolve: {
          departments: (DepartmentsService) => DepartmentsService.getDepartments(),
          nonPaginatedUsers: (UsersService) =>
            UsersService.getNonPaginatedUsers(),

          //TODO: Fix: only pull users from backend is user is an administrator
          // users: ($q, CardsService, UsersService) => {
          //   let deferred = $q.defer();
          //   if(UsersService.getUser().user_type_name === 'admin')
          //     deferred.resolve();
          //   else {
          //     deferred.reject();
          //   }
          //   return deferred.promise;
          // }
        },
        cards: (CardsService) =>
          CardsService.getCards({status: 'Active'}),
      })
      .state('dashboard.cards.add', {
        url: '/add',
        template: cardsAddTemplate,
        controller: 'CardsCtrl as ctrl',
        resolve: {
          departments: (DepartmentsService) => DepartmentsService.getDepartments(),
          users: (UsersService) => UsersService.getUsers(),
          nonPaginatedUsers: (UsersService) =>
            UsersService.getNonPaginatedUsers(),
        },
      })
      .state('dashboard.cards.view', {
        url: '/:id',
        abstract: true,
        template: cardsViewTemplate,
        controller: 'CardsCtrl as ctrl',
        resolve: {
          card: ($stateParams, CardsService) => CardsService.getCard($stateParams.id),
        },
      })
      .state('dashboard.cards.edit', {
        url: '/:id/edit',
        template: cardsEditTemplate,
        controller: 'CardsCtrl as ctrl',
        resolve: {
          card: ($stateParams, CardsService) => CardsService.getCard($stateParams.id),
          departments: (DepartmentsService) => DepartmentsService.getDepartments(),
          users: (UsersService) => UsersService.getUsers(),
          nonPaginatedUsers: (UsersService) =>
            UsersService.getNonPaginatedUsers(),
        },
      });
  })
  .service('CardsService', cardsService)
  .controller('CardsCtrl', cardsController)
  .name;

/**
 * Cards is in charge of encapsulating all functionality
 * related to credit cards inside the application.
 * This angular module declares all states from the cards sub tree
 * of views and requires the CardsUsage module to function properly.
 * @type {string}
 * @return {string} 'app.cards'
 */
export default cardsModule;
