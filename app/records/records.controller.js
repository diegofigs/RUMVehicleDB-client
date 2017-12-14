/** @ngInject */
export default class RecordsController {
  constructor($log, $state, $timeout, FileUploader,
              AuthService, CardUsageService, swal) {
    this.$log = $log;
    this.$state = $state;
    this.$timeout = $timeout;
    this.authService = AuthService;
    this.cardUsageService = CardUsageService;
    this.swal = swal;

    this.records = this.cardUsageService.cardUsages;
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
};
