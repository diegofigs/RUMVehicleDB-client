/**
 * StatsService provides functions for looking up
 * stats relevant to current user.
 */
export default class StatsService {
  /**
   * Constructs a new instance of StatsService and
   * initializes it.
   * @param $http
   * @param $log
   */
  constructor($http, $log) {
    // angular injected service
    this.$http = $http;
    this.$log = $log;
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/dashboard/stats';

    this.registered_users = 0;
    this.registered_vehicles = 0;
    this.active_credit_cards = 0;
    this.total_monthly_expenses = 0;
    this.latest_conciliation_date = 0;
  }

  /**
   * Getter function for pulling stats from system.
   * @return {Promise<Object>}
   */
  getDashboardStats() {
    return this.$http.get(this.baseDomain + this.resource)
      .then((response) => {
        this.registered_users = response.data.stats.registered_users;
        this.registered_vehicles = response.data.stats.registered_vehicles;
        this.active_credit_cards = response.data.stats.active_credit_cards;
        this.total_monthly_expenses = response.data.stats.total_monthly_expenses;
        this.latest_conciliation_date = response.data.latest_conciliation_date;
      });
  }
}
