(function(){
	'use strict';
	var app = angular.module('MaterialApp');

	var VehicleInformationService = function($http, $q, $stateParams, $filter){
		var _this = this;
		_this.$http = $http;
		_this.$q = $q;
		_this.$stateParams = $stateParams;
		_this.$filter = $filter;

		//Edmunds API connection variables
		_this.protocol = 'https://';
		_this.APIProvider = 'api.edmunds.com/';
		_this.makesEndpoint = 'api/vehicle/v2/makes?';
		_this.mediaEndpoint = 'api/media/v2/';
		_this.vinEndpoint = 'api/vehicle/v2/vins/';
		_this.responseFormat = 'json';
		_this.APIKey = 'kwepp7rqza2hd2xkumq9hsuj';

		_this.colors = [
			{name: 'Amarillo'},
			{name: 'Anaranjado'},
			{name: 'Azul'},
			{name: 'Blanco'},
			{name: 'Gris'},
			{name: 'Marrón'},
			{name: 'Negro'},
			{name: 'Rojo'},
			{name: 'Verde'},
			{name: 'Violeta'}
		];
	};
	VehicleInformationService.$inject = ['$http', '$q', '$stateParams', '$filter'];
	app.service('VehicleInformationService', VehicleInformationService);

	VehicleInformationService.prototype.getMakes = function () {
		var _this = this;
		var df = _this.$q.defer();

		_this.$http.get(_this.protocol + _this.APIProvider + 
						_this.makesEndpoint + 
						'fmt=' + _this.responseFormat + 
						'&api_key=' + _this.APIKey)
		.success(function(data) {
			var other = {name:'Other', models:[{name:'Other'}]};
			_this.makes = data.makes;
			_this.makes.push(other);
			df.resolve(data);
		// Fallback in case that the Edmunds API isn't available, or the api_key expires.
		}).error(function() {
			_this.$http.get('makes.json')
			.success(function(data) {
				_this.makes = data.makes;
				df.resolve(data);
			}).error(function(err) {
				df.reject(err);
			});
		});

		return df.promise;
	};

	VehicleInformationService.prototype.getVehicleInformationByVin = function (vin) {
		var _this = this;
		var df = _this.$q.defer();
		_this.vehicle = {};

		_this.$http.get(_this.protocol + _this.APIProvider + 
						_this.vinEndpoint + vin + '?' + 
						'fmt=' + _this.responseFormat + 
						'&api_key=' + _this.APIKey)
		.success(function(data) {
			_this.vehicle.make = data.make.name;
			_this.vehicle.model = data.model.name;
			_this.vehicle.year = data.years[0].year;
			df.resolve(data);
		}).error(function(err) {
			df.reject(err);
		});

		return df.promise;
	};

	VehicleInformationService.prototype.getVehiclePhotoURL = function (make, model, year) {
		var _this = this;
		var df = _this.$q.defer();
		_this.vehicle = {};

		_this.$http.get(_this.protocol + _this.APIProvider + _this.mediaEndpoint +
						make + '/' + model + '/' + year + '/photos' +
						'?fmt=' + _this.responseFormat + 
						'?api_key=' + _this.APIKey)
		.success(function(data) {
			console.log(data);
			var frontDriverVehicleURLs = _this.$filter('filter')(data.photos, {shotTypeAbbreviation: 'FQ'})[0].sources;
			// var photoThumbnailURL = _this.$filter('filter')(frontDriverVehicleURLs, {size: {height: 100, width: 150}})[0].link.href;
			console.log(frontDriverVehicleURLs);
			console.log(frontDriverVehicleURLs);
			df.resolve(data);
		}).error(function(err) {
			df.reject(err);
		});

		return df.promise;
	};

}());