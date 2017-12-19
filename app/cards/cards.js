/**
 * Created by diegofigs on 3/3/17.
 */
import cardsController from './cards.controller';
import cardsService from './cards.service';

import baseTemplate from '../core/base.html';
import cardsAddTemplate from './views/add-card.html';
import cardsEditTemplate from './views/edit-card.html';
import cardsViewTemplate from './views/view-card.html';
import cardsTemplate from './cards.html';

import cardUsageModule from './card-usage/card-usage.js';

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
          cards: (CardsService) => CardsService.getCards(),
          departments: (DepartmentsService) => DepartmentsService.getDepartments(),
          users: (UsersService) => UsersService.getUsers(),
        },
      })
      .state('dashboard.cards.add', {
        url: '/add',
        template: cardsAddTemplate,
        controller: 'CardsCtrl as ctrl',
        resolve: {
          departments: (DepartmentsService) => DepartmentsService.getDepartments(),
          users: (UsersService) => UsersService.getUsers(),
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
          users: (UsersService) => UsersService.getUsers()
        },
      });
  })
  .service('CardsService', cardsService)
  .controller('CardsCtrl', cardsController)
  .name;

export default cardsModule;
