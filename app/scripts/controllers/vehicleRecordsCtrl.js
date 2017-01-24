'use strict';
window.appVersion = 2.0;
var app = angular.module('MaterialApp');

/**
 * @ngdoc function
 * @name RUMVehicleDB.controller:VehicleRecordsCtrl
 * @description
 * # VehicleRecordsCtrl
 * Controller of RUMVehicleDB
 */

var VehicleRecordsCtrl = function($stateParams, $state, $filter, $log, VehicleRecordsService, VehiclesService){
	var vm = this;

	vm.vehicleID = $stateParams.vehicleID;
	vm.recordID = $stateParams.vehicleRecordID;
	vm.moreDetails = false;

	vm.VehicleRecordsService = VehicleRecordsService;
	vm.VehiclesService = VehiclesService;
	vm.$stateParams = $stateParams;
	vm.$state = $state;
	vm.$filter = $filter;
	vm.$log = $log;
};
VehicleRecordsCtrl.$inject = ['$stateParams', '$state', '$filter', '$log', 'VehicleRecordsService', 'VehiclesService'];
app.controller('VehicleRecordsCtrl', VehicleRecordsCtrl);
app.config(function($stateProvider) {
	$stateProvider
    .state('vehicleRecords', {
        url: '/vehicles/:vehicleID/records',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicle-records/vehicle-records.html?v='+window.appVersion,
        controller: 'VehicleRecordsCtrl',
        controllerAs: 'vm'
    })
    .state('vehicleRecords.view', {
        url: '/vehicles/:vehicleID/records/:vehicleRecordID',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicle-records/view-vehicle-record.html?v='+window.appVersion,
        controller: 'VehicleRecordsCtrl',
        controllerAs: 'vm'
    })
    .state('vehicleRecords.add', {
        url: '/vehicles/:vehicleID/record/add',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicle-records/add-vehicle-record.html?v='+window.appVersion,
        controller: 'VehicleRecordsCtrl',
        controllerAs: 'vm'
    })
    .state('vehicleRecords.edit', {
        url: '/vehicles/:vehicleID/records/:vehicleRecordID/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicle-records/edit-vehicle-record.html?v='+window.appVersion,
        controller: 'VehicleRecordsCtrl',
        controllerAs: 'vm'
    });
});

VehicleRecordsCtrl.prototype.showMoreDetails = function(){
	var vm = this;
	vm.moreDetails = !vm.moreDetails;
};

// The following methods are used in the records' index page
VehicleRecordsCtrl.prototype.getRecords = function(){
	var vm = this;

	vm.evenRecords = [];
	vm.oddRecords = [];

	vm.VehicleRecordsService.getRecords(vm.vehicleID)
	.then(function(data) {
		vm.records = data;
		for (var i=0;i<vm.records.length;i++){
		    if ((i+2)%2===0) {
		        vm.evenRecords.push(vm.records[i]);
		    }
		    else {
		        vm.oddRecords.push(vm.records[i]);
		    }
		}
	}, function(reason){
		vm.records = [];
		vm.$log.log(reason);
	});
};

//The following methods are used for getting details for a specific record
VehicleRecordsCtrl.prototype.getRecord = function(){
	var vm = this;
	vm.VehiclesService.getVehicle(vm.vehicleID)
	.then(function(data) {
		vm.vehicle = data;
	}, function(reason) {
		alert(vm.$filter('translate')('getVehicleFailed') + 'Message from server: ' + reason);
		vm.$log.log(reason);
	});
	vm.VehicleRecordsService.getRecord(vm.recordID)
	.then(function(data) {
		vm.record = data;
	}, function(reason){
		alert(vm.$filter('translate')('getRecordFailed') + ' Message from server: ' + reason);
		vm.$log.log(reason);
	});
};

//The following methods are used for adding a record to a vehicle
VehicleRecordsCtrl.prototype.initAddRecord = function(){
	var vm = this;
	vm.record = {};
};

VehicleRecordsCtrl.prototype.addRecord = function() {
	var vm = this;
	var response = confirm(vm.$filter('translate')('confirmDialog'));
	if (response) {
		alert(vm.$filter('translate')('addRecordSuccess'));
		vm.$state.go('vehicles.view', {vehicleID: vm.vehicleID});
		// vm.VehicleRecordsService.addRecord(vm.record)
		// .then(function() {
		// 	alert(vm.$filter('translate')('addRecordSuccess'));
		// 	vm.$state.go('vehicles.view', {vehicleID: vm.$stateParams.vehicleID});
		// }, function(reason){
		// 		alert(vm.$filter('translate')('addVehicleFailed') + ' Message from server: ' + reason);
		// 	vm.$log.log(reason);
		// });	
	}
};

//The following methods are used for editing details for a specific vehicle
VehicleRecordsCtrl.prototype.initEditRecord = function(){
	var vm = this;

	vm.VehicleRecordsService.getRecord(vm.$stateParams.vehicleRecordID)
	.then(function(data) {
		vm.record = data;
	}, function(reason) {
		alert(vm.$filter('translate')('getRecordFailed') + ' Message from server: ' + reason);
		vm.$log.log(reason);
	});
};

VehicleRecordsCtrl.prototype.editRecord = function() {
	var vm = this;
	var response = confirm(vm.$filter('translate')('confirmDialog'));
	if (response) {
		alert(vm.$filter('translate')('addVehicleSuccess'));
		vm.$state.go('records.view', {recordID: vm.recordID});
		// vm.VehicleRecordsService.editRecord(vm.vehicle)
		// .then(function() {
		// 	alert(vm.$filter('translate')('addVehicleSuccess'));
		// 	vm.$state.go('records.view', {recordID:vm.$stateParams.vehicleRecordID});
		// }, function(reason){
		// 		alert(vm.$filter('translate')('editRecordFailed') + ' Message from server: ' + reason);
		// 	vm.$log.log(reason);
		// });	
	}
};