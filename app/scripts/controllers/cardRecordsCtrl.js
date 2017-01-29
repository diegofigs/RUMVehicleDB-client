(function() {
  'use strict';
  window.appVersion = 2.0;
  var app = angular.module('MaterialApp');

  /**
  	 * @ngdoc function
  	 * @name RUMCardDB.controller:CardRecordsCtrl
  	 * @description
  	 * # CardRecordsCtrl
  	 * Controller of RUMCardDB
  */
  var CardRecordsCtrl = function($stateParams,
                                 $state,
                                 $filter,
                                 $log,
                                 CardRecordsService,
                                 CardsService) {
    var vm = this;

    vm.cardID = $stateParams.cardID;
    vm.recordID = $stateParams.cardRecordID;
    vm.moreDetails = false;

    vm.CardRecordsService = CardRecordsService;
    vm.CardsService = CardsService;
    vm.$stateParams = $stateParams;
    vm.$state = $state;
    vm.$filter = $filter;
    vm.$log = $log;
  };
  CardRecordsCtrl.$inject = ['$stateParams', '$state', '$filter',
    '$log', 'CardRecordsService', 'CardsService'];
  app.controller('CardRecordsCtrl', CardRecordsCtrl);
  app.config(function($stateProvider) {
    $stateProvider
        .state('cardRecords', {
          url: '/cards/:cardID/records',
          parent: 'dashboard',
          templateUrl: 'views/pages/dashboard' +
          '/card-records/card-records.html?v=' + window.appVersion,
          controller: 'CardRecordsCtrl',
          controllerAs: 'vm'
        })
        .state('cardRecords.view', {
          url: '/cards/:cardID/records/:cardRecordID',
          parent: 'dashboard',
          templateUrl: 'views/pages/dashboard' +
          '/card-records/view-card-record.html?v=' + window.appVersion,
          controller: 'CardRecordsCtrl',
          controllerAs: 'vm'
        })
        .state('cardRecords.add', {
          url: '/cards/:cardID/record/add',
          parent: 'dashboard',
          templateUrl: 'views/pages/dashboard' +
          '/card-records/add-card-record.html?v=' + window.appVersion,
          controller: 'CardRecordsCtrl',
          controllerAs: 'vm'
        })
        .state('cardRecords.edit', {
          url: '/cards/:cardID/records/:cardRecordID/edit',
          parent: 'dashboard',
          templateUrl: 'views/pages/dashboard' +
          '/card-records/edit-card-record.html?v=' + window.appVersion,
          controller: 'CardRecordsCtrl',
          controllerAs: 'vm'
        });
  });

  CardRecordsCtrl.prototype.showMoreDetails = function() {
    var vm = this;
    vm.moreDetails = !vm.moreDetails;
  };

  // The following methods are used in the records' index page
  CardRecordsCtrl.prototype.getRecords = function() {
    var vm = this;

    vm.evenRecords = [];
    vm.oddRecords = [];

    vm.CardRecordsService.getRecords(vm.cardID)
		.then(function(data) {
  vm.records = data;
  for (var i = 0; i < vm.records.length; i++) {
    if ((i + 2) % 2 === 0) {
      vm.evenRecords.push(vm.records[i]);
    } else {
      vm.oddRecords.push(vm.records[i]);
    }
  }
		}, function(reason) {
  vm.records = [];
  vm.$log.log(reason);
		});
  };

  //The following methods are used for getting details for a specific record
  CardRecordsCtrl.prototype.getRecord = function() {
    var vm = this;
    vm.CardsService.getCard(vm.cardID)
		.then(function(data) {
  vm.card = data;
		}, function(reason) {
  window.alert(vm.$filter('translate')('getCardFailed') +
    'Message from server: ' + reason);
  vm.$log.log(reason);
		});
    vm.CardRecordsService.getRecord(vm.recordID)
		.then(function(data) {
  vm.record = data;
		}, function(reason) {
  window.alert(vm.$filter('translate')('getRecordFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
		});
  };

  //The following methods are used for adding a record to a card
  CardRecordsCtrl.prototype.initAddRecord = function() {
    var vm = this;
    vm.record = {};
  };

  CardRecordsCtrl.prototype.addRecord = function() {
    var vm = this;
    var response = window.confirm(vm.$filter('translate')('confirmDialog'));
    if (response) {
      window.alert(vm.$filter('translate')('addRecordSuccess'));
      vm.$state.go('cards.view', {cardID: vm.cardID});
      // vm.CardRecordsService.addRecord(vm.record)
      // .then(function() {
      // 	alert(vm.$filter('translate')('addRecordSuccess'));
      // 	vm.$state.go('cards.view', {cardID: vm.$stateParams.cardID});
      // }, function(reason){
      // 		alert(vm.$filter('translate')('addCardFailed') + ' Message from server: ' + reason);
      // 	vm.$log.log(reason);
      // });
    }
  };

  //The following methods are used for editing details for a specific card
  CardRecordsCtrl.prototype.initEditRecord = function() {
    var vm = this;

    vm.CardRecordsService.getRecord(vm.$stateParams.cardRecordID)
		.then(function(data) {
  vm.record = data;
		}, function(reason) {
  window.alert(vm.$filter('translate')('getRecordFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
		});
  };

  CardRecordsCtrl.prototype.editRecord = function() {
    var vm = this;
    var response = window.confirm(vm.$filter('translate')('confirmDialog'));
    if (response) {
      window.alert(vm.$filter('translate')('addCardSuccess'));
      vm.$state.go('records.view', {recordID: vm.recordID});
      // vm.CardRecordsService.editRecord(vm.card)
      // .then(function() {
      // 	alert(vm.$filter('translate')('addCardSuccess'));
      // 	vm.$state.go('records.view', {recordID:vm.$stateParams.cardRecordID});
      // }, function(reason){
      // 		alert(vm.$filter('translate')('editRecordFailed') + ' Message from server: ' + reason);
      // 	vm.$log.log(reason);
      // });
    }
  };

}());
