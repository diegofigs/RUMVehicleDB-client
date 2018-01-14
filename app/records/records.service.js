
export default class RecordsService {
  /** @ngInject */
  constructor($http, $log, $sessionStorage) {
    this.$http = $http;
    this.$log = $log;
    this.$sessionStorage = $sessionStorage;
    this.resource = 'api/v1/dashboard';
    this.reportDates = [];
  }

    /**
     * Requests dates for generation a monthly report
     */
    getReportDates(){
      return this.$http.get(this.resource + '/report/dates', {
      }).then((response) => {
        this.$log.log(response);
        this.reportDates = response.data.data;
        return this.reportDates;
      })
        .catch((error) => {
          this.$log.log(error);
        });
    };
}
