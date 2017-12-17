/** @ngInject */
export default class RecordsController {
  constructor($log, $state, $timeout, FileUploader,
              AuthService, CardUsageService, DepartmentsService,
              UsersService, swal) {
    // Injected elements
    this.$log = $log;
    this.$state = $state;
    this.$timeout = $timeout;
    this.authService = AuthService;
    this.cardUsageService = CardUsageService;
    this.departmentsService = DepartmentsService;
    this.usersService = UsersService;
    this.swal = swal;

    this.purchaseTypes = ['Regular', 'Premium', 'Diesel'];

    this.filter = {
      department_id: '',
      custodian_id: '',
      purchase_type: '',
      date_from: new Date(),
      date_to: new Date(),
    };

    // Reference to records from service
    this.records = this.cardUsageService.cardUsages;
    // Reference to departments from service
    this.departments = this.departmentsService.departments;
    // Reference to custodian names
    this.users = this.usersService.users;

    // Lists that detail reconciliation process and breakdown
    this.reconciled = [];
    this.nonReconciled = [];
    this.excelNonReconciled = [];

    this.uploader = new FileUploader({
      url: 'http://dev.uprm.edu/rumvehicles/api/v1/records/reconcile',
      alias: 'file',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });

    this.uploader.onBeforeUploadItem = (fileItem) => {
      this.$log.log(fileItem);
    };

    this.uploader.onCompleteItem = (item, response, status, headers) => {
      let responseData = response.data;
      this.reconciled = responseData.reconciled_server_records;
      this.nonReconciled = responseData.no_reconciled_server_records;
      this.excelNonReconciled = responseData.excel_no_reconciliated_records;
      this.swal(
        'Good job!',
        'You have submitted the Report!',
        'success'
      );
    };

  }

  applyFilter(){
    return this.cardUsageService.getCardUsages(this.filter)
      .then( () => {
        this.records = this.cardUsageService.cardUsages;
      });
  }
};
