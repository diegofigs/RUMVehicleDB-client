/**
 * Cards Service is in charge of emitting http requests to the API
 * related to credit card information.
 */
export default class CardsService {
  /**
   * Constructs a new instance of CardsService and initializes it.
   * @param $http
   * @param $log
   * @param API
   */
  constructor($http, $log, API) {
    this.$http = $http;
    this.$log = $log;
    this.API = API;
    this.resource = '/api/v1/cards/';

    this.card = {};
    this.cards = [];

    // Initialize pagination metadata
    this.pageSize = 10;
    this.total = 1;
  }

  /**
   * Requests cards to the API, filtering results if params provided.
   * @param {Object} params Object where each key and value is used
   * for filtering requested Card objects
   * @return {Promise<Object>}
   */
  getCards(params) {
    return this.$http.get(this.API + this.resource, {
      params: params
    }).then((response) => {
        this.cards = response.data.data[0].data;
        this.pageSize = response.data.data[0].per_page;
        this.total = response.data.data[0].last_page;
        return this.cards;
      });
  }

  /**
   * Requests a single card to the API.
   * @param {number} id Numerical value provided by the API
   * @return {Promise<Object>}
   */
  getCard(id) {
    return this.$http.get(this.API + this.resource + id)
      .then((response) => {
        this.card = response.data.data;
        return this.card;
      });
  }

  /**
   * Requests the creation of a new Card object to the API.
   * @param {Object} card Card for creation
   * @return {Promise<Object>}
   */
  createCard(card) {
    return this.$http.post(this.API + this.resource, card);
  };

  /**
   * Requests the deletion of a single existing Card object to the API.
   * @param {Object} card Card for deletion
   * @returns {Promise<Object>}
   */
  deleteCard(card) {
    card.status = 'Inactive';
    return this.$http.put(this.API + this.resource + card.id, card);
  };

  /**
   * Requests the modification of a single existing
   * Card object to the API.
   * @param {Object} card Card for modification
   * @returns {Promise<Object>}
   */
  editCard(card) {
    return this.$http.put(this.API + this.resource + card.id, card);
  };
}
