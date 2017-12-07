/**
 * Created by Jan on 6/19/17.
 */

export default class CardUsageService {
  /** @ngInject */
  constructor($http, $log, AuthService) {
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/records';
    this.$http = $http;
    this.$log = $log;
    this.authService = AuthService;

    this.cards = [];

    this.cardUsages = [];

    this.files = [];
  }

  createCardUsageEntry(cardUsage) {

    return this.$http.post(this.baseDomain + this.resource, cardUsage, {
      transformRequest: angular.identity,
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
        'Content-Type' : undefined
      }
    }).catch((error) => {
      this.$log.log(error);
    });
  };

  getCardUsages() {
    return this.$http.get(this.baseDomain + this.resource, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).then((response) => {
      this.cardUsages = response.data.data[0].data;
      this.$log.log('I am inside getCardUsage in CardUsageService and cardUsage: ' + this.cardUsages);
      return this.cardUsages;
    }).catch((error) => {
      this.$log.log(error);
    });
  };

  deleteCardUsage(id) {
    this.$log.log('I am inside deleteCardUsage(cardUsage) in card-usage.service');
    return this.$http.delete(this.baseDomain + this.resource + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).catch((error) => {
      this.$log.log(error);
    });
  };

  editCardUsage(cardUsage) {
    this.$log.log('I am inside editCardUsage() in card-usage.service');
    return this.$http.put(this.baseDomain + this.resource + '/' + cardUsage, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).catch((error) => {
      this.$log.log(error);
    });
  };

}
