/**
 * Created by diegofigs on 2/6/17.
 */
export default class CardsService {
  /** @ngInject */
  constructor($http, $log, AuthService) {
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/cards';
    this.$http = $http;
    this.$log = $log;
    this.authService = AuthService;

    this.card = {};
    this.cards = [];
  }

  getCards() {
    return this.$http.get(this.baseDomain + this.resource, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).then((response) => {
      this.cards = response.data.data;
      return this.cards;
    }).catch((error) => {
        this.$log.log(error);
      });
  }

  getCard(id) {
    return this.$http.get(this.baseDomain + this.resource + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).then((response) => {
      this.card = response.data.data;
      return this.card;
    }).catch((error) => {
        this.$log.log(error);
      });
  }

  createCard(card) {
    return this.$http.post(this.baseDomain + this.resource, card, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).catch((error) => {
        this.$log.log(error);
      });
  };

  deleteCard(card) {
    return this.$http.delete(this.baseDomain + this.resource + '/' + card.id, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).catch((error) => {
        this.$log.log(error);
      });
  };

  editCard(card) {
    return this.$http.put(this.baseDomain + this.resource + '/' + card.id, card, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).catch((error) => {
        this.$log.log(error);
      });
  };
}
