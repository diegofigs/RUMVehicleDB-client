/**
 * Created by diegofigs on 1/31/17.
 */

import moment from 'moment-es6';

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
    this.custodianNames = this.usersService.users;
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
   * Shows confirmation dialog to user
   * If user confirms, vehicle will be deleted (if no error in deletion is present)
   * If user cancels, he/she will stay in the "Vehicles" view
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


  deleteVehicle(vehicle) {
    return this.vehiclesService.deleteVehicle(vehicle);
  }

  editVehicle() {
    return this.vehiclesService.editVehicle(this.vehicle)
      .then(() => {
      this.$state.go('dashboard.vehicles.list');
      });
  }

  getUser() {
    return this.authService.getUser();
  }

  applyVehicleFilter() {
    return this.vehiclesService.getVehicles(this.filter)
      .then(() => {
        this.vehicles = this.vehiclesService.vehicles;
      });
  }
}
