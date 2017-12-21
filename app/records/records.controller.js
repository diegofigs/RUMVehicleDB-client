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

    let today = new Date();
    let oneMonthAgo = (new Date()).setMonth(today.getMonth()-1);
    this.filter = {
      department_id: '',
      custodian_id: '',
      purchase_type: '',
      date_from: oneMonthAgo,
      date_to: today,
      page: 1,
    };

    this.pagination = {
      pageSize: this.cardUsageService.pageSize,
      total: this.cardUsageService.total,
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
      this.$state.go('dashboard.conciliation.step2');
    };

  }

  applyFilter(){
    return this.cardUsageService.getCardUsages(this.filter)
      .then( () => {
        this.records = this.cardUsageService.cardUsages;
      });
  }

  submitUsageForm(){
    let tempItem = null;
    for (let x = 0; x < this.uploader.queue.length; x++){
      this.tempItem = this.uploader.queue[x];
    }
    this.tempItem.upload();
  }
};
