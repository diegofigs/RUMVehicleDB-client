
import moment from 'moment';

export default class CardsUsageController {
  /** @ngInject */
  constructor($state, $log, FileUploader,
              AuthService, CardsService, CardUsageService) {
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;
    this.cardUsageService = CardUsageService;

    this.cardsService = CardsService;
    this.cardUsages = this.cardUsageService.cardUsages;
    this.temp_date = new Date();

    this.newCardUsage = {
      date: '',
      vehicle_mileage: '',
      provider_number: '',
      purchase_type: '',
      total_liters: '',
      total_receipt: '',
      receipt_number: '',
      comments: '',
      vehicle_id: '',
      card_id: '',
      custodian_id: '',
    };
    this.onDateChange();

    this.uploader = new FileUploader({
      url: 'http://dev.uprm.edu/rumvehicles/api/v1/records',
      alias: 'filename',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });

    this.uploader.onBeforeUploadItem = (fileItem) => {
      this.newCardUsage.custodian_id = this.authService.getUser().id;
      this.newCardUsage.card_id = this.cardsService.card.id;
      this.newCardUsage.vehicle_id = 1;
      this.$log.log(this.newCardUsage);
      fileItem.formData.push(this.newCardUsage);
    };

    this.uploader.onCompleteItem = (item, response, status, headers) => {
      this.$log.log(item);
      this.$log.log(status);
      this.$log.log(response);
      this.$state.go('dashboard.cards.view.card-usage');
    };

  }

  submitUsageForm() {

    let tempItem = null;

    for (let x = 0; x < this.uploader.queue.length; x++){
      this.tempItem = this.uploader.queue[x];
    }
    this.tempItem.upload();
  }

  onDateChange() {
    this.newCardUsage.date = moment(this.temp_date).format('YYYY-M-D');
  }

  getCardUsages() {
    return this.cardUsageService.getCardUsages();
  }

  deleteCardUsage(id) {
    return this.cardUsageService.deleteCardUsage(id)
      .then(() => {
        this.$state.reload();
      });
  }

  editCardUsage(id) {
    return this.cardUsageService.editCardUsage(this.cardUsages.id)
      .then(() => {
        this.$state.go('dashboard.cards.view.card-usage');
      });
  }

}
