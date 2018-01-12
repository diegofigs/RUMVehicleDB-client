import 'angular-material/angular-material.scss';
import 'angular-material-data-table/dist/md-data-table.css';
import 'ng-material-floating-button/mfb/dist/mfb.css';
import 'mdi/css/materialdesignicons.css';
import 'sweetalert2/dist/sweetalert2.css';
import './styles/app-green.scss';

import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularUiRouter from 'angular-ui-router';
import 'angular-ui-router/release/stateEvents.js';
import angularMaterial from 'angular-material';
import translate from 'angular-translate';
import ngStorage from 'ngstorage';
import { ngSweetAlert2 } from 'angular-h-sweetalert';
import 'angular-file-upload';
import 'angular-truncate-2';
import 'angular-translate-loader-static-files';
import 'angular-ui-sortable/dist/sortable.min';
import 'ng-material-floating-button/src/mfb-directive';
import 'material-angular-paging/build/dist.min';
import 'angular-material-data-table';
import 'angular-messages';

import coreModule from './core/core';
import cardsModule from './cards/cards';
import departmentsModule from './departments/departments';
import vehiclesModule from './vehicles/vehicles';
import usersModule from './users/users';
import cardUsageModule from './cards/card-usage/card-usage';
import recordsModule from './records/records';

import englishTranslations from './languages/en.json';
import spanishTranslations from './languages/es.json';

export const appModule = 'app';

angular.module(appModule, [
  angularUiRouter,
  angularAnimate,
  'ngMessages',
  'angularFileUpload',
  angularMaterial,
  'md.data.table',
  ngStorage.name,
  translate,
  ngSweetAlert2,
  'ui.sortable',
  'ng-mfb',
  'cl.paging',
  'truncate',
  'ui.router.state.events',
  coreModule,
  cardsModule,
  departmentsModule,
  vehiclesModule,
  usersModule,
  cardUsageModule,
  recordsModule,
]).config(($translateProvider) => {
  $translateProvider.translations('en', englishTranslations);
  $translateProvider.translations('es', spanishTranslations);
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('en');
})
  .config(($mdIconProvider, $mdThemingProvider) => {
    $mdIconProvider
      .fontSet('mdi', 'material-icons');

    let greenMap = $mdThemingProvider.extendPalette('green', {
      'contrastDefaultColor': 'light',
    });
    $mdThemingProvider.definePalette('newGreen', greenMap);

    let redMap = $mdThemingProvider.extendPalette('red', {
      'contrastDefaultColor': 'light',
    });
    $mdThemingProvider.definePalette('newRed', redMap);

    $mdThemingProvider.theme('default')
      .primaryPalette('newGreen')
      .warnPalette('newRed');
  })
  .run(($rootScope) => {
    $rootScope.stateIsLoading = false;

    $rootScope.$on('$stateChangeStart',() => {
      $rootScope.stateIsLoading = true;
    });

    $rootScope.$on('$stateChangeSuccess', () => {
      $rootScope.stateIsLoading = false;
    });
  });
