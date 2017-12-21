/**
 * RecordsController is in charge of handling all presentation logic
 * around displaying all records in the system. Functionality includes
 * filtering displayed records by different properties and paginating
 * them.
 */
export default class RecordsController {
  /**
   * Constructs a new instance of RecordsController and initializes it.
   * @param $log
   * @param $state
   * @param $timeout
   * @param FileUploader
   * @param AuthService
   * @param CardUsageService
   * @param DepartmentsService
   * @param UsersService
   * @param swal
   */
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

    // Type of gas purchases
    this.purchaseTypes = ['Regular', 'Premium', 'Diesel'];

    // Temporary dates for filters
    // Default range is from 1 month ago to today
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

    // Default page size and total records can be found in the
    // CardUsageService's properties.
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

    // Instantiate uploader from angular-file-upload
    // Add config so that it hits the correct API route
    this.uploader = new FileUploader({
      url: 'http://dev.uprm.edu/rumvehicles/api/v1/records/reconcile',
      alias: 'file',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });

    // Hook for processing a file before upload
    this.uploader.onBeforeUploadItem = (fileItem) => {
      // Log file object
      this.$log.log(fileItem);
    };

    // Hook for handling succesfull uploads
    this.uploader.onCompleteItem = (item, response, status, headers) => {
      // Hold response
      let responseData = response.data;
      // Assign three categorized lists of transactions in system
      this.reconciled = responseData.reconciled_server_records;
      this.nonReconciled = responseData.no_reconciled_server_records;
      this.excelNonReconciled = responseData.excel_no_reconciliated_records;
      // Display successful feedback message
      this.swal(
        'Good job!',
        'You have submitted the Report!',
        'success'
      );
    };

  }

  /**
   * Function that pulls up a records list in compliance with
   * the filter object pass
   * @return {Promise<Object[]>}
   */
  applyFilter(){
    return this.cardUsageService.getCardUsages(this.filter)
      .then(() => {
        this.records = this.cardUsageService.cardUsages;
        return this.records;
      });
  }
};
