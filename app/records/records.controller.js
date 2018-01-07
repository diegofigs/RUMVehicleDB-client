/** @ngInject */
export default class RecordsController {
  constructor($log, $state, $sessionStorage, $timeout, FileUploader,
              AuthService, CardUsageService, DepartmentsService,
              UsersService, NotificationService, swal) {
    // Injected elements
    this.$log = $log;
    this.$state = $state;
    this.$sessionStorage = $sessionStorage;
    this.$timeout = $timeout;
    this.authService = AuthService;
    this.cardUsageService = CardUsageService;
    this.departmentsService = DepartmentsService;
    this.usersService = UsersService;
    this.notificationService = NotificationService;
    this.swal = swal;

    this.purchaseTypes = ['Regular', 'Premium', 'Diesel'];

    let today = new Date();
    let oneMonthAgo = (new Date()).setMonth(today.getMonth()-1); //TODO: Verify that both dates are sent in a correct format
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
    this.records = this.cardUsageService.cardsUsages;
    // Reference to departments from service
    this.departments = this.departmentsService.departments;
    // Reference to custodian names
    this.users = this.usersService.users;
    this.notifications = this.notificationService.notifications;

    this.reportDates = [];

    // Lists that detail reconciliation process and breakdown
    this.reconciled = [];
    this.nonReconciled = [];
    this.excelNonReconciled = this.$sessionStorage.excelNonReconciled || [];
    this.conciliation_percent = this.$sessionStorage.conciliation_percent || [];
    this.total_excel_records = this.$sessionStorage.total_excel_records || [];
    this.total_server_records = this.$sessionStorage.total_server_records || [];
    this.total_expenses_in_excel_records = this.$sessionStorage.total_expenses_in_excel_records || [];
    this.total_expenses_in_server_records = this.$sessionStorage.total_expenses_in_server_records || [];

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
      this.$sessionStorage.conciliation_percent = responseData.conciliation_percent;
      this.$sessionStorage.total_excel_records = responseData.total_excel_records;
      this.$sessionStorage.total_server_records = responseData.total_server_records;
      this.$sessionStorage.total_expenses_in_excel_records = responseData.total_expenses_in_excel_records;
      this.$sessionStorage.total_expenses_in_server_records = responseData.total_expenses_in_server_records;
      this.$sessionStorage.excelNonReconciled = responseData.excel_no_reconciliated_records;
      this.swal({
        title: 'Good job!',
        text: 'You have submitted the Report!',
        type: 'success',
      }).then(() => {
        this.$state.go('dashboard.conciliation.step2');
      });
    };

  }

  applyFilter(){
    return this.cardUsageService.getCardsUsages(this.filter)
      .then( () => {
        this.records = this.cardUsageService.cardsUsages;
      });
  }

  submitInvoice(){
    this.swal({
      title: 'Confirm Upload',
      type: 'info',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#4caf50',
      showCancelButton: 'true',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#f44336',
    }).then(() => {
      let tempItem = null;
      for (let x = 0; x < this.uploader.queue.length; x++){
        this.tempItem = this.uploader.queue[x];
      }
      this.tempItem.upload();
    });
  }

  isStateActive(stateName) {
    return this.$state.current.name === stateName;
  }

  submitJustification(notification) {
    notification.was_read = 1;
    return this.notificationService.justifyNotification(notification)
      .then(() => {
        this.swal({
          title: 'Success!',
          text: 'You have submitted justification!',
          type: 'success',
        }).then(() => {
          this.$state.reload();
        });
      })
      .catch((error) => {
        this.$log.log(error);
        this.swal({
          title: 'Error',
          text: 'There was an error communicating with the server.',
          type: 'error',
        });
      });
  }
};
