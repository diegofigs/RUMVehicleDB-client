/**
 * Created by diegofigs on 2/13/17.
 */
export default class VehiclesService {
  /** @ngInject */
  constructor($http, $log, AuthService) {
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/vehicles';
    this.$http = $http;
    this.$log = $log;
    this.authService = AuthService;

    this.vehicle = {};
    this.vehicles = [];
  }

  getVehicles() {
    return this.$http.get(this.baseDomain + this.resource, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).then((response) => {
      this.vehicles = response.data.data[0].data;
      return this.vehicles;
    })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  getVehicle(id) {
    return this.$http.get(this.baseDomain + this.resource + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).then((response) => {
      this.vehicle = response.data.data;
      return this.vehicle;
    })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  createVehicle(vehicle) {
    return this.$http.post(this.baseDomain + this.resource, vehicle, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).catch((error) => {
      this.$log.log(error);
    });
  }

  deleteVehicle(vehicle) {
    return this.$http.delete(this.baseDomain + this.resource + '/' + vehicle.id, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).catch((error) => {
      this.$log.log(error);
    });
  }

  editVehicle(vehicle) {
    return this.$http.put(this.baseDomain + this.resource + '/' + vehicle.id, vehicle, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).catch((error) => {
      this.$log.log(error);
    });
  }

}
