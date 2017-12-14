export default class CardUsageService {
  /** @ngInject */
  constructor($http, $log) {
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/records';
    this.$http = $http;
    this.$log = $log;

    this.cards = [];

    this.cardUsages = [];

    this.files = [];
  }

  getCardUsages() {
    return this.$http.get(this.baseDomain + this.resource)
      .then((response) => {
        this.cardUsages = response.data.data[0].data;
        this.$log.log('I am inside getCardUsage in CardUsageService and cardUsage: ' + this.cardUsages);
        return this.cardUsages;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  };

  deleteCardUsage(id) {
    this.$log.log('I am inside deleteCardUsage(cardUsage) in card-usage.service');
    return this.$http.delete(this.baseDomain + this.resource + '/' + id)
      .catch((error) => {
        this.$log.log(error);
      });
  };

  editCardUsage(cardUsage) {
    this.$log.log('I am inside editCardUsage() in card-usage.service');
    return this.$http.put(this.baseDomain + this.resource + '/' + cardUsage)
      .catch((error) => {
        this.$log.log(error);
      });
  };

}
