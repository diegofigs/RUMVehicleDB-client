import 'angular-material/angular-material.scss';
import 'angular-material-data-table/dist/md-data-table.min.css';
import 'ng-material-floating-button/mfb/dist/mfb.min.css';
import 'mdi/css/materialdesignicons.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import './styles/app-green.scss';
import './styles/scss/widgets/card-filter.scss'

import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularUiRouter from 'angular-ui-router';
import angularMaterial from 'angular-material';
import translate from 'angular-translate/dist/angular-translate.min';
import ngStorage from 'ngstorage/ngStorage.min';
import { ngSweetAlert2 } from 'angular-h-sweetalert';
import 'angular-file-upload';
import 'angular-truncate-2/src/angular-truncate-2';
import 'angular-translate-loader-static-files';
import 'angular-bootstrap-lightbox';
import 'angular-ui-sortable';
import 'ng-material-floating-button/src/mfb-directive';
import 'material-angular-paging/build/dist.min';
import 'angular-material-data-table'
import 'angular-messages';

import coreModule from './core/core';
import cardsModule from './cards/cards';
import departmentsModule from './departments/departments';
import vehiclesModule from './vehicles/vehicles';
import usersModule from './users/users';
import cardUsageModule from './cards/card-usage/card-usage';
import recordsModule from './records/records';

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
  coreModule,
  cardsModule,
  departmentsModule,
  vehiclesModule,
  usersModule,
  cardUsageModule,
  recordsModule,
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
  });
