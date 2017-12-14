/**
 * Created by diegofigs on 12/13/17.
 */

export default class StatsService {
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';

    this.registered_users = 0;
    this.registered_vehicles = 0;
    this.active_credit_cards = 0;
    this.total_monthly_expenses = 0;
  }

  getDashboardStats() {
    return this.$http.get(this.baseDomain + '/dashboard/stats')
      .then((response) => {
        this.registered_users = response.data.stats.registered_users;
        this.registered_vehicles = response.data.stats.registered_vehicles;
        this.active_credit_cards = response.data.stats.active_credit_cards;
        this.total_monthly_expenses = response.data.stats.total_monthly_expenses;
      });
  }
}
