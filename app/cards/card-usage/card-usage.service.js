/**
 * Card Usage Service is in charge of API calls (GET, POST, PUT, DELETE)
 * related to card usage (gas transactions) object
 */

export default class CardUsageService {

  constructor($http, $log) {
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/records';
    this.$http = $http;
    this.$log = $log;

    // Initialize usage list
    this.cardUsages = [];

    // Initialize pagination metadata
    this.pageSize = 10;
    this.total = 1;
  }

  /**
   * Requests all card usages if no param is given
   * If filtering params are given, then requests card usages that apply only
   * @param params Filtering parameters for card usages
   */
  getCardUsages(params) {
    return this.$http.get(this.baseDomain + this.resource, {
      params: params
    }).then((response) => {
        this.$log.log(response);
        this.cardUsages = response.data.data[0].data;
        this.pageSize = response.data.data[0].per_page;
        this.total = response.data.data[0].last_page;
        return this.cardUsages;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  };

  /**
   * Deletes a specific card usage from the backend
   * @param id Card Usage ID
   * @returns {Promise} Server response. If delete was not successful, catch error and log it.
   */
  deleteCardUsage(id) {
    this.$log.log('I am inside deleteCardUsage(cardUsage) in card-usage.service');
    return this.$http.delete(this.baseDomain + this.resource + '/' + id)
      .catch((error) => {
        this.$log.log(error);
      });
  };

  /**
   * Modifies a card usage in the backend
   * @param cardUsage Card Usage
   * @returns {FinishedRequest<T>} Server response. If edit was not successful, catch error and log it.
   */
  editCardUsage(cardUsage) {
    this.$log.log('I am inside editCardUsage() in card-usage.service');
    return this.$http.put(this.baseDomain + this.resource + '/' + cardUsage)
      .catch((error) => {
        this.$log.log(error);
      });
  };

}
