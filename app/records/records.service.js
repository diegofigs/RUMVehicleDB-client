
export default class RecordsService {
  /** @ngInject */
  constructor($http, $log, $sessionStorage, API) {
    this.$http = $http;
    this.$log = $log;
    this.$sessionStorage = $sessionStorage;
    this.API = API;
    this.resource = '/api/v1/dashboard/';
    this.reportDates = [];
  }

    /**
     * Requests dates for generation a monthly report
     */
    getReportDates(){
      return this.$http.get(this.API + this.resource + 'report/dates', {
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
