(function(){
	'use strict';
	var app = angular.module('MaterialApp');

	var VehicleRecordsService = function($http, $q, $stateParams, $filter){
		var _this = this;
		_this.$http = $http;
		_this.$q = $q;
		_this.$stateParams = $stateParams;
		_this.$filter = $filter;
		_this.BACKEND_SERVER = '/test/vehicles.json';
	};
	VehicleRecordsService.$inject = ['$http', '$q', '$stateParams', '$filter'];
	app.service('VehicleRecordsService', VehicleRecordsService);

	VehicleRecordsService.prototype.getRecords = function (vehicleID) {
		var _this = this;
		var df = _this.$q.defer();
		
		// _this.$http.get(_this.BACKEND_SERVER + 'vehicles?' + 
		// 	'&licensePlateID=' + licensePlateID + 
		// 	'&owner=' + owner + '&make=' + 
		// 	make + '&model=' + model)
		// .success(function(data){
			var data = {'data':[
			{'_id':4,'licensePlateID':'DEY346','vin':null,'make':'Toyota','model':'Tercel','year':1995,'color':'Blanco','licenseOwner':null,'creatorID':1,'createTime':'2016-04-28 06:43:23','updaterID':null,'updateTime':null,'isRegistered':true,'infractionCount':8,'infractionSum':1340,'parkingPermit':2432,'parkingPermitType':'Blanco','parkingPermitProv':0},{'_id':1,'licensePlateID':'ERJ587','vin':'1GYEC63T02R262048','make':'Cadillac','model':'Escalade','year':2002,'color':'Negro','licenseOwner':'Wigberto Maldonado Rivera','creatorID':1,'createTime':'2016-04-27 13:54:44','updaterID':null,'updateTime':null,'isRegistered':true,'infractionCount':13,'infractionSum':1185,'parkingPermit':150,'parkingPermitType':'Verde','parkingPermitProv':0},{'_id':2,'licensePlateID':'FIT001','vin':'AHFRJKLBVCSRUK235','make':'Toyota','model':'Corolla','year':2012,'color':'Amarillo','licenseOwner':'Vivian Ruiz','creatorID':1,'createTime':'2016-04-28 05:26:38','updaterID':1,'updateTime':'2016-04-28 05:55:29','isRegistered':true,'infractionCount':5,'infractionSum':365,'parkingPermit':1324,'parkingPermitType':'Blanco','parkingPermitProv':0},{'_id':3,'licensePlateID':'GKG522','vin':'JM1BK143551301796','make':'Mazda','model':3,'year':2005,'color':'Rojo','licenseOwner':'Haydee Rios Battistini','creatorID':1,'createTime':'2016-04-28 05:27:44','updaterID':null,'updateTime':null,'isRegistered':true,'infractionCount':5,'infractionSum':300,'parkingPermit':1325,'parkingPermitType':'Blanco','parkingPermitProv':0},{'_id':9,'licensePlateID':'HOLA123','vin':null,'make':'Acura','model':'CL','year':2000,'color':'Blanco','licenseOwner':null,'creatorID':2,'createTime':'2016-04-28 09:54:41','updaterID':null,'updateTime':null,'isRegistered':true,'infractionCount':5,'infractionSum':130,'parkingPermit':1325,'parkingPermitType':'Blanco','parkingPermitProv':0},{'_id':6,'licensePlateID':'IDD544','vin':null,'make':'Subaru','model':'Forester','year':2012,'color':'Marr\u00f3n','licenseOwner':null,'creatorID':1,'createTime':'2016-04-28 09:32:42','updaterID':null,'updateTime':null,'isRegistered':true,'infractionCount':2,'infractionSum':120,'parkingPermit':1505,'parkingPermitType':'Verde','parkingPermitProv':0}],'total':6};

			var vehicles = data.data;
			var total = data.total;
			df.resolve(vehicles, total);
		// })
		// .error(function(err) {
		// 	df.reject(err.message);
		// });

		return df.promise;
	};

	VehicleRecordsService.prototype.getRecord = function (vehicleID) {
		var _this = this;
		var df = _this.$q.defer();
		// _this.$http.get(_this.BACKEND_SERVER + 'vehicles/' + vehicleID)
		// .success(function(data) {
			var data = {'data':{'_id':3,'licensePlateID':'GKG522','vin':'JM1BK143551301796','make':'Mazda','model':'3','year':2005,'color':'Rojo','licenseOwner':'Haydee Rios Battistini','creatorID':1,'createTime':'2016-04-28 05:27:44','updaterID':null,'updateTime':null,'isRegistered':true,'infractionCount':5,'infractionSum':300,'parkingPermit':1325,'parkingPermitType':'Blanco','parkingPermitProv':0}};
			var vehicle = data.data;
			df.resolve(vehicle);
		// }).error(function(err) {
		// 	df.reject(err.message);
		// });

		return df.promise;
	};

	
	VehicleRecordsService.prototype.addRecord = function (json) {
		var _this = this;
		// console.log(json);
		var df = _this.$q.defer();
		_this.$http.post(_this.BACKEND_SERVER + 'vehicles', json)
		.success(function(data){
			df.resolve(data);
		})
		.error(function(err) {
			df.reject(err.message);
		});
		return df.promise;
	};

	VehicleRecordsService.prototype.editRecord = function (vehicleID, json) {
		var _this = this;

		var df = _this.$q.defer();
		_this.$http.put(_this.BACKEND_SERVER + 'vehicles/' + vehicleID, json)
		.success(function(data){
			// alert('Success. Vehicle updated.');
			df.resolve(data);
		})
		.error(function(err) {
			df.reject(err.message);
		});
		return df.promise;
	};
}());