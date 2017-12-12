/**
 * Created by diegofigs on 12/7/17.
 */
export default class RecordsService {
  /** @ngInject */
  constructor($http, $log, $sessionStorage) {
    this.$http = $http;
    this.$log = $log;
    this.$sessionStorage = $sessionStorage;
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
  }

}
