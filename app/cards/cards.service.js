
/**
 * Cards Service is in charge of API calls (GET, POST, PUT, DELETE)
 * related to credit cards
 */
export default class CardsService {
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
   * Requests all cards if no param is given
   * If filtering params are given, then requests cards that apply only
   * @param params Filtering parameters for cards
   */
  getCards(params = {}) {
    return this.$http.get(this.API + this.resource, {
      params: params
    }).then((response) => {
        this.cards = response.data.data[0].data;
        this.pageSize = response.data.data[0].per_page;
        this.total = response.data.data[0].last_page;
        return this.cards;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  /**
   * Requests the backend for a specific card
   * @param id Card ID
   */
  getCard(id) {
    return this.$http.get(this.API + this.resource + id)
      .then((response) => {
        this.card = response.data.data;
        return this.card;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  /**
   * Requests backend to create a new card
   * @param card Credit Card Object
   */
  createCard(card) {
    return this.$http.post(this.API + this.resource, card);
  };

  /**
   * Deletes a specific card from the backend
   * @param card Credit Card Object
   * @returns {Promise} Server response. If delete was not successful, catch error and log it.
   */
  deleteCard(card) {
    card.status = 'Inactive';
    return this.$http.put(this.API + this.resource + '/' + card.id,card)
      .catch((error) => {
        this.$log.log(error);
      });
  };

  /**
   * Modifies a card in the backend
   * @param card Card to be modified
   * @returns {FinishedRequest<T>} Server response. If edit was not successful, catch error and log it.
   */
  editCard(card) {
    return this.$http.put(this.API + this.resource + card.id, card)
      .catch((error) => {
        this.$log.log(error);
      });
  };
}
