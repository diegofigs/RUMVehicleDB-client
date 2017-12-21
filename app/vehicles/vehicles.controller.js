

import moment from 'moment-es6';

/**
 * Vehicles Controller is in charge of all business logic related to UPRM's Vehicles
 */
export default class VehiclesController {
  constructor($state, $log,
           AuthService, DepartmentsService, UsersService, VehiclesService, swal) {
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;
    this.departmentsService = DepartmentsService;
    this.usersService = UsersService;
    this.vehiclesService = VehiclesService;

    this.vehicles = this.vehiclesService.vehicles;
    this.vehicle = this.vehiclesService.vehicle;
    this.departments = this.departmentsService.departments;
    //Get all custodians for card filtering purposes.
    this.users = this.usersService.users;
    this.vehicleTypes = this.vehiclesService.vehicleTypes;
    this.newVehicle = {};
    this.swal = swal;

    // Filter object will contain filter parameters for filtering vehicles
    this.filter = {
      department_id: '',
      custodian_id: '',
      vehicle_type: '',
    };
  }

  /**
   * If vehicle creation is successful, shows user success feedback
   * If vehicle creation is unsuccessful, shows user error feedback
   */

  confirmVehicleCreation(){

    this.createVehicle()
      .then(() => {
        this.swal({
          title: 'Vehicle was successfully created!',
          type: 'success'
        });
      })
      .catch((error) => {
        this.swal({
          title: 'Error: Vehicle could not be created',
          type: 'error'
        });
      });
  }

  /**
   * Sends vehicle to be created to the Vehicles Service
   * Formats input dates as YYYY-MM-DD
   */
  createVehicle() {
    this.newVehicle.custodian_id = this.authService.getUser().id;

    this.newVehicle.marbete_date = moment(this.newVehicle.marbete_date).format('YYYY-MM-DD');
    this.newVehicle.decomission_date = moment(this.newVehicle.decomission_date).format('YYYY-MM-DD');
    this.newVehicle.inscription_date = moment(this.newVehicle.inscription_date).format('YYYY-MM-DD');
    this.newVehicle.inspection_date = moment(this.newVehicle.inspection_date).format('YYYY-MM-DD');

    return this.vehiclesService.createVehicle(this.newVehicle)
      .then(() => {
      this.$state.go('dashboard.vehicles.list');
      });
  }

  /**
   *  Shows confirmation dialog to user
   * If user confirms, vehicle will be deleted (if no error in deletion is present)
   * If user cancels, he/she will stay in the "Vehicles" view
   * @param vehicle Vehicle to be deleted
   */
  confirmVehicleDeletion(vehicle) {

    this.swal({
      title: 'Do you really want to delete this vehicle?',
      type: 'warning',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#4caf50',
      showCancelButton: 'true',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#f44336',
    }).then(() => {

      this.deleteVehicle(vehicle)
        .then(() => {

          this.swal({
            title: 'Vehicle has been deleted',
            type: 'success'
          });

          this.$state.reload();
      })
        .catch((error) => {
          this.swal({
            title: 'Error: Vehicle could not be deleted',
            type: 'error'
          });
        });
    });
  }

  /**
   *Sends vehicle to be deleted to the Vehicles Service
   * @param vehicle Vehicle to be deleted
   * @returns {*}
   */
  deleteVehicle(vehicle) {
    return this.vehiclesService.deleteVehicle(vehicle);
  }

  /**
   * If vehicle edition is successful, shows user success feedback
   * If vehicle edition is unsuccessful, shows user error feedback
   */
  confirmVehicleEdition(){

      this.editVehicle()
        .then(() => {
          this.swal({
            title: 'Vehicle was successfully edited!',
            type: 'success'
          });
        })
        .catch((error) => {
          this.swal({
            title: 'Error: Vehicle could not be edited',
            type: 'error'
          });
        });
    }

  /**
   * Sends vehicle to be edited to the Vehicles Service
   */
  editVehicle() {

    this.vehicle.marbete_date = moment(this.vehicle.marbete_date).format('YYYY-MM-DD');
    this.vehicle.decomission_date = moment(this.vehicle.decomission_date).format('YYYY-MM-DD');
    this.vehicle.inscription_date = moment(this.vehicle.inscription_date).format('YYYY-MM-DD');
    this.vehicle.inspection_date = moment(this.vehicle.inspection_date).format('YYYY-MM-DD');

    return this.vehiclesService.editVehicle(this.vehicle)
      .then(() => {
      this.$state.go('dashboard.vehicles.list');
      });
  }

  /**
   * gets current system User
   * @returns {*|Object} User Object
   */
  getUser() {
    return this.authService.getUser();
  }

  /**
   * Requests Vehicles Service a list of vehicles with filter parameters applied
   */
  applyVehicleFilter() {
    return this.vehiclesService.getVehicles(this.filter)
      .then(() => {
        this.vehicles = this.vehiclesService.vehicles;
      });
  }
}
