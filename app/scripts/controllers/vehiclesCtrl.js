'use strict';
window.appVersion = 2.0;
var app = angular.module('MaterialApp');

/**
 * @ngdoc function
 * @name RUMVehicleDB.controller:VehiclesCtrl
 * @description
 * # VehiclesCtrl
 * Controller of RUMVehicleDB
 */

var VehiclesCtrl = function($stateParams,
                            $state,
                            $filter,
                            $log,
                            $mdDialog,
                            VehiclesService,
                            VehicleInformationService) {
  var vm = this;

  vm.moreDetails = false;

  vm.VehiclesService = VehiclesService;
  vm.VehicleInformationService = VehicleInformationService;
  vm.$stateParams = $stateParams;
  vm.$state = $state;
  vm.$filter = $filter;
  vm.$log = $log;
  vm.$mdDialog = $mdDialog;
};
VehiclesCtrl.$inject = ['$stateParams',
  '$state', '$filter', '$log', '$mdDialog',
  'VehiclesService', 'VehicleInformationService'];
app.controller('VehiclesCtrl', VehiclesCtrl);
app.config(function($stateProvider) {
  $stateProvider
    .state('vehicles', {
      url: '/vehicles',
      parent: 'dashboard',
      templateUrl: 'views/pages/dashboard' +
      '/vehicles/vehicles.html?v=' + window.appVersion,
      controller: 'VehiclesCtrl',
      controllerAs: 'vm'
    })
    .state('vehicles.view', {
      url: '/vehicles/:vehicleID',
      parent: 'dashboard',
      templateUrl: 'views/pages/dashboard' +
      '/vehicles/view-vehicle.html?v=' + window.appVersion,
      controller: 'VehiclesCtrl',
      controllerAs: 'vm'
    })
    .state('vehicles.add', {
      url: '/vehicle/add',
      parent: 'dashboard',
      templateUrl: 'views/pages/dashboard' +
      '/vehicles/add-vehicle.html?v=' + window.appVersion,
      controller: 'VehiclesCtrl',
      controllerAs: 'vm'
    })
    .state('vehicles.edit', {
      url: '/vehicles/:vehicleID/edit',
      parent: 'dashboard',
      templateUrl: 'views/pages/dashboard' +
      '/vehicles/edit-vehicle.html?v=' + window.appVersion,
      controller: 'VehiclesCtrl',
      controllerAs: 'vm'
    });
});

VehiclesCtrl.prototype.showMoreDetails = function() {
  var vm = this;
  vm.moreDetails = !vm.moreDetails;
};

// The following methods are used in the vehicles' index page
VehiclesCtrl.prototype.getVehicles = function() {
  var vm = this;

  vm.evenVehicles = [];
  vm.oddVehicles = [];

  vm.VehiclesService
    .getVehicles(vm.licensePlateSearch, vm.makeSearch, vm.modelSearch)
	.then(function() {
  vm.vehicles = vm.VehiclesService.vehicles;
  for (var i = 0; i < vm.vehicles.length; i++) {
    if ((i + 2) % 2 === 0) {
      vm.evenVehicles.push(vm.vehicles[i]);
    } else {
      vm.oddVehicles.push(vm.vehicles[i]);
    }
  }
	}, function(reason) {
  vm.vehicles = [];
  vm.$log.log(reason);
	});
};

//The following methods are used for getting details for a specific vehicle
VehiclesCtrl.prototype.getVehicle = function() {
  var vm = this;
  vm.VehiclesService.getVehicle(vm.$stateParams.vehicleID)
	.then(function() {
  vm.vehicle = vm.VehiclesService.vehicle;
	}, function(reason) {
  window.alert(vm.$filter('translate')('getVehicleFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
	});
};

VehiclesCtrl.prototype.showAddUsageEntry = function(ev) {
  // Appending dialog to document.body to cover sidenav in docs app
  console.log('hey');
  var vm = this;
  var confirm = vm.$mdDialog.confirm()
  .title('Add Vehicle Usage Entry')
  .content('Would you like to add a usage entry to this vehicle?')
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

//The following methods are used for adding a vehicle to an owner
VehiclesCtrl.prototype.initAddVehicle = function() {
  var vm = this;
  vm.vehicle = {};
  vm.VehicleInformationService.getMakes()
	.then(function() {
  vm.makes = vm.VehicleInformationService.makes;
  vm.colors = vm.VehicleInformationService.colors;
	}, function(reason) {
  window.alert(vm.$filter('translate')('getFormDataFailed') +
    ' Message from server: ' + reason);
	});
};

VehiclesCtrl.prototype.addVehicle = function() {
  var vm = this;
  var response = window.confirm(vm.$filter('translate')('confirmDialog'));
  if (response) {
    vm.VehiclesService.addVehicle(vm.vehicle)
		.then(function() {
  window.alert(vm.$filter('translate')('addVehicleSuccess'));
  vm.$state.go('owners.view', {ownerID:vm.$stateParams.ownerID});
		}, function(reason) {
  window.alert(vm.$filter('translate')('addVehicleFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
		});
  }
};

//The following methods are used for editing details for a specific vehicle
VehiclesCtrl.prototype.initEditVehicle = function() {
  var vm = this;

  vm.VehicleInformationService.getMakes()
	.then(function() {
  vm.makes = vm.VehicleInformationService.makes;
  vm.colors = vm.VehicleInformationService.colors;
  return vm.VehiclesService.getVehicle(vm.$stateParams.vehicleID);
	}, function(reason) {
  window.alert(vm.$filter('translate')('getFormDataFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
	})
	.then(function() {
  vm.vehicle = vm.VehiclesService.vehicle;
  console.log(vm.vehicle);
  vm.vehicle.make = vm.vehicle.make.toString();
  vm.vehicle.model = vm.vehicle.model.toString();
  vm.vehicle.color = vm.vehicle.color.replace(/ /g, '');
  console.log(vm.vehicle);
  vm.make = vm.$filter('filter')(vm.makes, {name: vm.vehicle.make}, true)[0];
  if (vm.vehicle.vin) {
    vm.getVehicleInformationByVin();
  } else if (vm.make) {
    vm.models = vm.$filter('filter')(vm.makes,
      {name: vm.vehicle.make}, true)[0].models;
    vm.model = vm.$filter('filter')(vm.models,
      {name: vm.vehicle.model}, true)[0];
    if (!vm.model) {
      vm.customMake = vm.vehicle.make;
      vm.customModel = vm.vehicle.model;
      vm.vehicle.make = 'Other';
    }
  } else {
    vm.customMake = vm.vehicle.make;
    vm.customModel = vm.vehicle.model;
    vm.vehicle.make = 'Other';
    vm.models = undefined;
  }
	}, function(reason) {
  window.alert(vm.$filter('translate')('getVehicleFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
	});
};

VehiclesCtrl.prototype.editVehicle = function() {
  var vm = this;
  var response = window.confirm(vm.$filter('translate')('confirmDialog'));
  if (response) {
    vm.VehiclesService.addVehicle(vm.vehicle)
		.then(function() {
  window.alert(vm.$filter('translate')('addVehicleSuccess'));
  vm.$state.go('owners.view', {ownerID:vm.$stateParams.ownerID});
		}, function(reason) {
  window.alert(vm.$filter('translate')('addVehicleFailed') +
    ' Message from server: ' + reason);
  vm.$log.log(reason);
		});
  }
};

VehiclesCtrl.prototype.getVehicleInformationByVin = function() {
  var vm = this;
  if (vm.vehicle.vin) {
    vm.VehicleInformationService.getVehicleInformationByVin(vm.vehicle.vin)
		.then(function() {
  vm.foundVehicle = vm.VehicleInformationService.vehicle;
  vm.vehicle.make = vm.foundVehicle.make;
  vm.refreshModels();
  vm.vehicle.model = vm.foundVehicle.model;
  vm.vehicle.year = vm.foundVehicle.year;
  vm.vehicleInfoIsFound = true;

		}, function() {
  vm.vehicleInfoIsFound = false;
		});
  }
};

VehiclesCtrl.prototype.refreshModels = function() {
  var vm = this;
  vm.vehicle.model = undefined;
  vm.models = vm.$filter('filter')(vm.makes,
    {name: vm.vehicle.make}, true)[0].models;
};

VehiclesCtrl.prototype.getVehiclePhoto = function(make, model, year) {
  var vm = this;
  if (make && model && year) {
    vm.VehicleInformationService.getVehiclePhotoURL(make, model, year)
		.then(function() {
  return vm.VehicleInformationService.vehicle;
		}, function() {
  vm.vehicleInfoIsFound = false;
		});
  }
};
