/**
 * CardUsage Service is in charge of emitting http requests to the API
 * related to card expense information.
 */
export default class CardUsageService {
  /**
   * Constructs a new instance of CardUsageService and initializes it.
   * @param $http
   * @param $log
   * @param API
   */
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
    this.page = 1;
  }

  /**
   * Requests usages to the API, filtering results if params provided.
   * @param {Object} params Object where each key and value is used
   * for filtering requested Usage objects
   * @return {Promise<Object>}
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
   * Requests a single card usage from a card to the API.
   * @param {number} cardID Numerical value provided by the API
   * @param {Object} params
   * @return {Promise<Object>}
   */
  getSingleCardUsages(cardID, params) {
    //Empty array of single card usages
    this.singleCardUsages = [];
    return this.$http.get(this.API + this.resource + 'card/' + cardID, {
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
   * Requests the deletion of a single existing Card Usage
   * object to the API.
   * @param {number} id Numerical id of Usage object for deletion
   * @returns {Promise<Object>}
   */
  deleteCardUsage(id) {
    return this.$http.delete(this.API + this.resource + id);
  };

  /**
   * Requests the modification of a single existing
   * Usage object to the API.
   * @param {Object} cardUsage Usage for modification
   * @returns {Promise<Object>}
   */
  editCardUsage(cardUsage) {
    return this.$http.put(this.API + this.resource + cardUsage);
  };

}
