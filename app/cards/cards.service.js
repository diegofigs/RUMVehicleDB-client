
/**
 * Cards Service is in charge of API calls (GET, POST, PUT, DELETE)
 * related to credit cards
 */
export default class CardsService {
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
    this.resource = '/cards';

    this.card = {};
    this.cards = [];
  }

  /**
   * Requests all cards if no param is given
   * If filtering params are given, then requests cards that apply only
   * @param params Filtering parameters for cards
   */
  getCards(params = {}) {
    return this.$http.get(this.resource, {
      params: params
    }).then((response) => {
        this.cards = response.data.data[0].data;
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
    return this.$http.get(this.resource + '/' + id)
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
    return this.$http.post(this.resource, card)
      .catch((error) => {
        this.$log.log(error);
      });
  };

  /**
   * Deletes a specific card from the backend
   * @param card Credit Card Object
   * @returns {Promise} Server response. If delete was not successful, catch error and log it.
   */
  deleteCard(card) {
    return this.$http.delete(this.resource + '/' + card.id)
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
    return this.$http.put(this.resource + '/' + card.id, card)
      .catch((error) => {
        this.$log.log(error);
      });
  };
}
