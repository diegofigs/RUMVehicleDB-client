
/**
 * Vehicles Service is in charge of API calls (GET, POST, PUT, DELETE)
 * related to UPRM's Vehicles
 */
export default class VehiclesService {

  constructor($http, $log, API) {
    this.$http = $http;
    this.$log = $log;
    this.API = API;
    this.resource = '/api/v1/vehicles/';

    this.vehicle = {};
    this.vehicles = [];
    this.vehicleTypes = [];

    // Initialize pagination metadata
    this.pageSize = 10;
    this.total = 1;
  }

  /**
   * Requests all vehicles if no param is given
   * If filtering params are given, then requests vehicles that apply only
   * @param params Filtering parameters for vehicles
   */
  getVehicles(params = {}) {
    return this.$http.get(this.API + this.resource, {
      params: params
    }).then((response) => {
        this.vehicles = response.data.data[0].data;
        this.pageSize = response.data.data[0].per_page;
        this.total = response.data.data[0].last_page;
        return this.vehicles;
      });
  }

  /**
   * Requests the backend for a specific vehicle
   * @param id Vehicle ID
   */
  getVehicle(id) {
    return this.$http.get(this.API + this.resource + id)
      .then((response) => {
        this.vehicle = response.data.data;
        return this.vehicle;
      });
  }

  /**
   * Requests backend to create a new vehicle
   * @param vehicle Vehicle Object
   */
  createVehicle(vehicle) {
    return this.$http.post(this.API + this.resource, vehicle);
  }

  /**
   * Deletes a specific vehicle from the backend
   * @param vehicle Vehicle Object
   * @returns {Promise} Server response. If delete was not successful, catch error and log it.
   */
  deleteVehicle(vehicle) {
    vehicle.was_archived = 1;
    return this.$http.put(this.API + this.resource + vehicle.id, vehicle);
  }

  /**
   * Modifies a vehicle in the backend
   * @param vehicle Vehicle to be modified
   * @returns {FinishedRequest<T>} Server response. If edit was not successful, catch error and log it.
   */
  editVehicle(vehicle) {
    return this.$http.put(this.API + this.resource + vehicle.id, vehicle);
  }

  /**
   * Gets vehicle types from backend. E.g. Golf car, Mini-Van, Gas Car, etc.
   */
  getVehicleTypes() {
    return this.$http.get(this.API + '/api/v1/vehicle-types')
        .then((response) => {
      this.vehicleTypes = response.data;
          return this.vehicleTypes;
    })
      .catch((error) => {
        this.$log.log(error);
      });
  }

}
