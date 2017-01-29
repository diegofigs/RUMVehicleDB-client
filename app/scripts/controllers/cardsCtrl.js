(function() {
  'use strict';
  window.appVersion = 2.0;
  var app = angular.module('MaterialApp');

  /**
  	 * @ngdoc function
  	 * @name RUMCardDB.controller:CardsCtrl
  	 * @description
  	 * # CardsCtrl
  	 * Controller of RUMCardDB
  */
  var CardsCtrl = function($stateParams,
                           $state,
                           $filter,
                           $log,
                           $mdDialog,
                           CardsService,
                           VehicleInformationService) {
    var vm = this;

    vm.moreDetails = false;

    vm.CardsService = CardsService;
    vm.VehicleInformationService = VehicleInformationService;
    vm.$stateParams = $stateParams;
    vm.$state = $state;
    vm.$filter = $filter;
    vm.$log = $log;
    vm.$mdDialog = $mdDialog;
  };
  CardsCtrl.$inject = ['$stateParams', '$state', '$filter', '$log',
    '$mdDialog', 'CardsService', 'VehicleInformationService'];
  app.controller('CardsCtrl', CardsCtrl);
  app.config(function($stateProvider) {
    $stateProvider
        .state('cards', {
          url: '/cards',
          parent: 'dashboard',
          templateUrl: 'views/pages/dashboard' +
          '/cards/cards.html?v=' + window.appVersion,
          controller: 'CardsCtrl',
          controllerAs: 'vm'
        })
        .state('cards.view', {
          url: '/cards/:cardID',
          parent: 'dashboard',
          templateUrl: 'views/pages/dashboard' +
          '/cards/view-card.html?v=' + window.appVersion,
          controller: 'CardsCtrl',
          controllerAs: 'vm'
        })
        .state('cards.add', {
          url: '/card/add',
          parent: 'dashboard',
          templateUrl: 'views/pages/dashboard' +
          '/cards/add-card.html?v=' + window.appVersion,
          controller: 'CardsCtrl',
          controllerAs: 'vm'
        })
        .state('cards.edit', {
          url: '/cards/:cardID/edit',
          parent: 'dashboard',
          templateUrl: 'views/pages/dashboard' +
          '/cards/edit-card.html?v=' + window.appVersion,
          controller: 'CardsCtrl',
          controllerAs: 'vm'
        });
  });

  CardsCtrl.prototype.showMoreDetails = function() {
    var vm = this;
    vm.moreDetails = !vm.moreDetails;
  };

  // The following methods are used in the cards' index page
  CardsCtrl.prototype.getCards = function() {
    var vm = this;

    vm.evenCards = [];
    vm.oddCards = [];

    vm.CardsService.getCards(vm.licensePlateSearch,
      vm.makeSearch, vm.modelSearch)
		.then(function() {
  vm.cards = vm.CardsService.cards;
  for (var i = 0; i < vm.cards.length; i++) {
    if ((i + 2) % 2 === 0) {
      vm.evenCards.push(vm.cards[i]);
    } else {
      vm.oddCards.push(vm.cards[i]);
    }
  }
		}, function(reason) {
  vm.cards = [];
  vm.$log.log(reason);
		});
  };

  //The following methods are used for getting details for a specific card
  CardsCtrl.prototype.getCard = function() {
    var vm = this;
    vm.CardsService.getCard(vm.$stateParams.cardID)
		.then(function() {
  vm.card = vm.CardsService.card;
		}, function(reason) {
  window.alert(vm.$filter('translate')('getCardFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
		});
  };

  CardsCtrl.prototype.showAddUsageEntry = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    console.log('hey');
    var vm = this;
    var confirm = vm.$mdDialog.confirm()
    .title('Add Card Usage Entry')
    .content('Would you like to add a usage entry to this card?')
    .ariaLabel('Usage Entry Form')
    .targetEvent(ev)
    .ok('Add Usage Entry!')
    .cancel('Cancel');
    vm.$mdDialog.show(confirm).then(function() {
      vm.status = 'Awesome!';
      console.log(vm.status);
    }, function() {
      vm.status = 'Canceled';
      console.log(vm.status);
    });
  };

  //The following methods are used for adding a card to an owner
  CardsCtrl.prototype.initAddCard = function() {
    var vm = this;
    vm.card = {};
    vm.VehicleInformationService.getMakes()
		.then(function() {
  vm.makes = vm.VehicleInformationService.makes;
  vm.colors = vm.VehicleInformationService.colors;
		}, function(reason) {
  window.alert(vm.$filter('translate')('getFormDataFailed') +
    ' Message from server: ' + reason);
		});
  };

  CardsCtrl.prototype.addCard = function() {
    var vm = this;
    var response = window.confirm(vm.$filter('translate')('confirmDialog'));
    if (response) {
      vm.CardsService.addCard(vm.card)
			.then(function() {
  window.alert(vm.$filter('translate')('addCardSuccess'));
  vm.$state.go('owners.view', {ownerID:vm.$stateParams.ownerID});
			}, function(reason) {
  window.alert(vm.$filter('translate')('addCardFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
			});
    }
  };

  //The following methods are used for editing details for a specific card
  CardsCtrl.prototype.initEditCard = function() {
    var vm = this;

    vm.VehicleInformationService.getMakes()
		.then(function() {
  vm.makes = vm.VehicleInformationService.makes;
  vm.colors = vm.VehicleInformationService.colors;
  return vm.CardsService.getCard(vm.$stateParams.cardID);
		}, function(reason) {
  window.alert(vm.$filter('translate')('getFormDataFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
		})
		.then(function() {
  vm.card = vm.CardsService.card;
  console.log(vm.card);
  vm.card.make = vm.card.make.toString();
  vm.card.model = vm.card.model.toString();
  vm.card.color = vm.card.color.replace(/ /g, '');
  console.log(vm.card);
  vm.make = vm.$filter('filter')(vm.makes, {name: vm.card.make}, true)[0];
  if (vm.card.vin) {
    vm.getVehicleInformationByVin();
  } else if (vm.make) {
    vm.models = vm.$filter('filter')(vm.makes,
      {name: vm.card.make}, true)[0].models;
    vm.model = vm.$filter('filter')(vm.models,
      {name: vm.card.model}, true)[0];
    if (!vm.model) {
      vm.customMake = vm.card.make;
      vm.customModel = vm.card.model;
      vm.card.make = 'Other';
    }
  } else {
    vm.customMake = vm.card.make;
    vm.customModel = vm.card.model;
    vm.card.make = 'Other';
    vm.models = undefined;
  }
		}, function(reason) {
  window.alert(vm.$filter('translate')('getCardFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
		});
  };

  CardsCtrl.prototype.editCard = function() {
    var vm = this;
    var response = window.confirm(vm.$filter('translate')('confirmDialog'));
    if (response) {
      vm.CardsService.addCard(vm.card)
			.then(function() {
  window.alert(vm.$filter('translate')('addCardSuccess'));
  vm.$state.go('owners.view', {ownerID:vm.$stateParams.ownerID});
			}, function(reason) {
  window.alert(vm.$filter('translate')('addCardFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
			});
    }
  };

  CardsCtrl.prototype.getVehicleInformationByVin = function() {
    var vm = this;
    if (vm.card.vin) {
      vm.VehicleInformationService.getVehicleInformationByVin(vm.card.vin)
			.then(function() {
  vm.foundCard = vm.VehicleInformationService.card;
  vm.card.make = vm.foundCard.make;
  vm.refreshModels();
  vm.card.model = vm.foundCard.model;
  vm.card.year = vm.foundCard.year;
  vm.cardInfoIsFound = true;

			}, function() {
  vm.cardInfoIsFound = false;
			});
    }
  };

  CardsCtrl.prototype.refreshModels = function() {
    var vm = this;
    vm.card.model = undefined;
    vm.models = vm.$filter('filter')(vm.makes,
      {name: vm.card.make}, true)[0].models;
  };

  CardsCtrl.prototype.getCardPhoto = function(make, model, year) {
    var vm = this;
    if (make && model && year) {
      vm.VehicleInformationService.getCardPhotoURL(make, model, year)
			.then(function() {
  return vm.VehicleInformationService.card;
			}, function() {
  vm.cardInfoIsFound = false;
			});
    }
  };

}());
