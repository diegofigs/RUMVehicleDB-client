/**
 * Card Usage Service is in charge of API calls (GET, POST, PUT, DELETE)
 * related to card usage (gas transactions) object
 */

export default class CardUsageService {

  constructor($http, $log, API) {
    this.$http = $http;
    this.$log = $log;
    this.API = API;
    this.resource = '/api/v1/records/';

    // Initialize all cards usage list
    this.cardsUsages = [];

    //Initialize single card usage
    this.singleCardUsages = [];

    // Initialize pagination metadata
    this.pageSize = 10;
    this.total = 1;
  }

  /**
   * Requests all card usages if no param is given
   * If filtering params are given, then requests card usages that apply only
   * @param params Filtering parameters for card usages
   */
  getCardsUsages(params) {
    return this.$http.get(this.API + this.resource, {
      params: params
    }).then((response) => {
        this.$log.log(response);
        this.cardsUsages = response.data.data[0].data;
        this.pageSize = response.data.data[0].per_page;
        this.total = response.data.data[0].last_page;
        return this.cardsUsages;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  };

  /**
   * Requests card usages for a single card
   * @params cardID Card ID
   */
  getSingleCardUsages(cardID, params) {
    //Empty array of single card usages
    this.singleCardUsages = [];
    return this.$http.get(this.API + this.resource + '/card/' + cardID, {
      params: params
    })
      .then((response) => {
      this.$log.log(response);
      this.singleCardUsages = response.data.data[0].data;
      this.pageSize = response.data.data[0].per_page;
      this.total = response.data.data[0].total;
      return this.singleCardUsages;
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
    return this.$http.delete(this.API + this.resource + id)
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
    return this.$http.put(this.API + this.resource + cardUsage)
      .catch((error) => {
        this.$log.log(error);
      });
  };

}
