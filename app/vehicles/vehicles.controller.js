/**
 * Created by diegofigs on 1/31/17.
 */
export default class VehiclesController {
  /** @ngInject */
  constructor($state, $log,
           AuthService, DepartmentsService, VehiclesService) {
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;
    this.departmentsService = DepartmentsService;
    this.vehiclesService = VehiclesService;

    this.vehicles = this.vehiclesService.vehicles;
    this.vehicle = this.vehiclesService.vehicle;
    this.departments = this.departmentsService.departments;
    this.newVehicle = {};
  }

  createVehicle() {
    this.newVehicle.custodian_id = this.authService.getUser().id;
    return this.vehiclesService.createVehicle(this.newVehicle)
      .then(() => {
      this.$state.go('dashboard.vehicles.list');
      });
  }

  deleteVehicle(vehicle) {
    return this.vehiclesService.deleteVehicle(vehicle)
      .then(() => {
      this.$state.reload();
    });
  }

  editVehicle() {
    return this.vehiclesService.editVehicle(this.vehicle)
      .then(() => {
      this.$state.go('dashboard.vehicles.list');
      });
  }
}
