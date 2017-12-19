/**
 * Created by diegofigs on 2/13/17.
 */

/**
 * Vehicles Service is in charge of API calls (GET, POST, PUT, DELETE)
 * related to UPRM's Vehicles
 */
export default class VehiclesService {

  constructor($http, $log) {
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/vehicles';
    this.$http = $http;
    this.$log = $log;

    this.vehicle = {};
    this.vehicles = [];
    this.vehicleTypes = [];
  }

  /**
   * Requests all vehicles if no param is given
   * If filtering params are given, then requests vehicles that apply only
   * @param params Filtering parameters for vehicles
   */
  getVehicles(params = {}) {
    return this.$http.get(this.baseDomain + this.resource, {
      params: params
    }).then((response) => {
        this.vehicles = response.data.data[0].data;
        return this.vehicles;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  /**
   * Requests the backend for a specific vehicle
   * @param id Vehicle ID
   */
  getVehicle(id) {
    return this.$http.get(this.baseDomain + this.resource + '/' + id)
      .then((response) => {
        this.vehicle = response.data.data;
        return this.vehicle;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  /**
   * Requests backend to create a new vehicle
   * @param vehicle Vehicle Object
   */
  createVehicle(vehicle) {
    return this.$http.post(this.baseDomain + this.resource, vehicle)
      .catch((error) => {
        this.$log.log(error);
      });
  }

  /**
   * Deletes a specific vehicle from the backend
   * @param vehicle Vehicle Object
   * @returns {Promise} Server response. If delete was not successful, catch error and log it.
   */
  deleteVehicle(vehicle) {
    return this.$http.delete(this.baseDomain + this.resource + '/' + vehicle.id)
  }

  /**
   * Modifies a vehicle in the backend
   * @param vehicle Vehicle to be modified
   * @returns {FinishedRequest<T>} Server response. If edit was not successful, catch error and log it.
   */
  editVehicle(vehicle) {
    return this.$http.put(this.baseDomain + this.resource + '/' + vehicle.id, vehicle)
      .catch((error) => {
        this.$log.log(error);
      });
  }

  /**
   * Gets vehicle types from backend. E.g. Golf car, Mini-Van, Gas Car, etc.
   */
  getVehicleTypes() {
    return this.$http.get(this.baseDomain + '/vehicle-types')
        .then((response) => {
      this.vehicleTypes = response.data;
          return this.vehicleTypes;
    })
      .catch((error) => {
        this.$log.log(error);
      });
  }

}
