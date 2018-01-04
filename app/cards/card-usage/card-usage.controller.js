
import moment from 'moment';

/**
 * Controller is in charge of all business logic related to card usages (Gas transactions)
 */
export default class CardsUsageController {
  constructor($state, $log, FileUploader,
              AuthService, CardsService, CardUsageService, swal) {
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;
    this.cardUsageService = CardUsageService;

    this.cardsService = CardsService;
    this.cardsUsages = this.cardUsageService.cardsUsages;
    this.singleCardUsages = this.cardUsageService.singleCardUsages;
    this.temp_date = new Date();
    this.swal = swal;

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
      department_id: ''
    };
    this.onDateChange();

    /**
     *  Used for uploading gas transaction, including receipt
     */
    this.uploader = new FileUploader({
      url: 'http://dev.uprm.edu/rumvehicles/api/v1/records',
      alias: 'filename',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });

    /**
     * Gathers New Card Usage data and file data (receipt picture) together
     * @param fileItem
     */
    this.uploader.onBeforeUploadItem = (fileItem) => {
      this.newCardUsage.custodian_id = this.authService.getUser().id;
      this.newCardUsage.card_id = this.cardsService.card.id;
      this.newCardUsage.department_id = this.cardsService.card.department_id;
      this.newCardUsage.vehicle_id = 1;
      this.$log.log(this.newCardUsage);
      fileItem.formData.push(this.newCardUsage);
    };

    /**
     * Once upload is complete, goes back to card usage list
     * @param item
     * @param response
     * @param status
     * @param headers
     */
    this.uploader.onCompleteItem = (item, response, status, headers) => {
      this.$log.log(item);
      this.$log.log(status);
      this.$log.log(response);
      this.$state.go('dashboard.cards.view.card-usage');
    };
  }

  /**
   * Shows a card usage receipt in a dialog/pop up
   * @param usage Card usage object
   */
  showReceipt(usage){
    console.log(usage.record_picture);
    this.swal({
      title: 'Receipt',
      imageUrl: usage.record_picture,
    });
  }

  /**
   * Shows confirmation dialog to user
   * If user confirms, a new card usage/record will be created
   * If user cancels, he/she will stay in the "Add New Card Usage" view
   */
  confirmUsageForm() {

    this.swal({
      title: 'Confirm transaction',
      html: '<div class="confirmation-table">' +
      '<ul style="list-style-type:none; text-align: left">' +
      '<li> Date:  ' + '<b>' + this.newCardUsage.date + '</b></li>' +
      '<li> Store:  ' + '<b>' + this.newCardUsage.provider_number + '</b></li>' +
      '<li> Vehicle mileage:  ' + '<b>' + this.newCardUsage.vehicle_mileage + '</b></li>' +
      '<li> Purchase type:  ' + '<b>' + this.newCardUsage.purchase_type + '</b></li>' +
      '<li> Total of liters:  ' + '<b>' + this.newCardUsage.total_liters + '</b></li>' +
      '<li> Receipt total:  ' + '<b>' + this.newCardUsage.total_receipt + '</b></li>' +
      '<li> Receipt number: ' + '<b>' + this.newCardUsage.receipt_number + '</b></li>' +
      '<li> Comments:  ' + '<b>' + this.newCardUsage.comments + '</b></li></ul></div>',
      type: 'info',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#4caf50',
      showCancelButton: 'true',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#f44336',
    }).then(() => {

      this.swal({
        title: 'Success!',
        text: 'You have submitted a new transaction successfully',
        type: 'success'
      });
      this.submitUsageForm();
    });
  }

  /**
   * Sends newly created gas transaction to backend
   */
  submitUsageForm(){

    let tempItem = null;

    for (let x = 0; x < this.uploader.queue.length; x++){
      this.tempItem = this.uploader.queue[x];
    }
    this.tempItem.upload();
  }

  /**
   * Method used to format date in the format YYYY-MM-DD
   */
  onDateChange() {
    this.newCardUsage.date = moment(this.temp_date).format('YYYY-M-D');
  }

  /**
   * Gets all card usages or gas transactions that are logged in the system
   * @returns {Promise} Promise object represents all card usages
   */
  getCardsUsages() {
    return this.cardUsageService.getCardsUsages();
  }

  /**
   * Gets a single card usages or gas transactions that are logged in the system
   * @returns {Promise} Promise object represents a single card usages
   */
  getSingleCardUsages(cardID) {
    return this.cardUsageService.getSingleCardUsages(cardID);
  }

  /**
   * Deletes a specific card usage or gas transaction
   * @param id Card Usage ID
   */
  deleteCardUsage(id) {
    return this.cardUsageService.deleteCardUsage(id)
      .then(() => {
        this.$state.reload();
      });
  }

  /**
   * Modifies a specific card usage or gas transaction
   * @param id Card Usage ID
   */
  editCardUsage(id) {
    return this.cardUsageService.editCardUsage(this.cardUsages.id)
      .then(() => {
        this.$state.go('dashboard.cards.view.card-usage');
      });
  }

}
