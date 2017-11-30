import 'angular-material/angular-material.scss';
import 'ng-material-floating-button/mfb/src/mfb.scss';
import 'mdi/scss/materialdesignicons.scss';
import './styles/app-green.scss';

import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularUiRouter from 'angular-ui-router';
import angularMaterial from 'angular-material';
import translate from 'angular-translate';
import ngStorage from 'ngstorage';
import 'angular-file-upload';
import 'angular-truncate-2/src/angular-truncate-2';
import 'angular-translate-loader-static-files';
import 'angular-bootstrap-lightbox';
import 'angular-ui-sortable';
import 'ng-material-floating-button/src/mfb-directive';

import coreModule from './core/core';
import cardsModule from './cards/cards';
import departmentsModule from './departments/departments';
import vehiclesModule from './vehicles/vehicles';
import usersModule from './users/users';
import cardUsageModule from './cards/card-usage/card-usage';

export const appModule = 'app';

/** @ngInject */
angular.module(appModule, [
  angularUiRouter,
  angularAnimate,
  'angularFileUpload',
  angularMaterial,
  ngStorage.name,
  translate,
  'ui.sortable',
  'ng-mfb',
  'truncate',
  coreModule,
  cardsModule,
  departmentsModule,
  vehiclesModule,
  usersModule,
  cardUsageModule,
]).config(($translateProvider) => {
  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json',
  });
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('en');
})
  .config(($mdIconProvider, $mdThemingProvider) => {
    $mdIconProvider
      .fontSet('mdi', 'material-icons');
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .warnPalette('grey');
  });
