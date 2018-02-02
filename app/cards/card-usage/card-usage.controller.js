import moment from 'moment';

/**
 * CardsUsage Controller is in charge of presentation and validation logic
 * for usage related states and interactions.
 */
export default class CardsUsageController {
  /**
   * Constructs a new instance of CardsUsageController and initializes it.
   * @param $state
   * @param $log
   * @param $stateParams
   * @param $window
   * @param FileUploader
   * @param AuthService
   * @param CardsService
   * @param CardUsageService
   * @param swal
   * @param API
   */
  constructor($state, $log, $stateParams, $window, FileUploader,
              AuthService, CardsService, CardUsageService, swal, API) {
    this.$state = $state;
    this.$log = $log;
    this.$stateParams = $stateParams;
    this.$window = $window;
    this.authService = AuthService;
    this.cardUsageService = CardUsageService;

    this.cardsService = CardsService;
    this.cardsUsages = this.cardUsageService.cardsUsages;
    this.singleCardUsages = this.cardUsageService.singleCardUsages;
    this.temp_date = new Date();
    this.swal = swal;
    this.API = API;

    this.card = this.cardsService.getCard($stateParams.id);

    this.pageQuery = {
      page: this.cardUsageService.page,
    };

    this.pagination = {
      boundaryLinks: true,
      limit: this.cardUsageService.pageSize,
      total: this.cardUsageService.total,
    };

    this.getPaginatedSingleCardUsages = this.getPaginatedSingleCardUsages.bind(this);

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

    this.date = new Date();

    this.today = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );

    /**
     * Uploader object used for uploading assets like
     * receipt images and travel ballots.
     */
    this.uploader = new FileUploader({
      url: this.API + '/api/v1/records',
      alias: 'filename',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });

    /**
     * Gathers new Card Usage data and file (receipt picture),
     * aggregates them to the form data.
     * @param {File} fileItem File item to be processed before upload
     * @callback
     */
    this.uploader.onBeforeUploadItem = (fileItem) => {
      this.newCardUsage.custodian_id = this.authService.getUser().id;
      this.newCardUsage.card_id = this.cardsService.card.id;
      this.newCardUsage.department_id = this.cardsService.card.department_id;
      this.newCardUsage.vehicle_id = 1;
      fileItem.formData.push(this.newCardUsage);
    };

    /**
     * Once upload is complete, navigate back to card usage state.
     * @param item
     * @param response
     * @param status
     * @param headers
     * @callback
     */
    this.uploader.onCompleteItem = (item, response, status, headers) => {
      this.$state.go('dashboard.cards.view.card-usage');
    };

    this.tempItem = null;
  }

  /**
   * Shows a card usage receipt in a new tab
   * @param {Object} usage Usage object for receipt display
   */
  showReceipt(usage){
    this.$window.open(usage.record_picture, "_blank");
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
      '<li> Date:  ' + '<b>' + moment(this.newCardUsage.date).format('MMM D, YYYY') + '</b></li>' +
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

      this.submitUsageForm();

        if(this.uploader.queue.length === 0){
          this.swal({
            title: 'Receipt not found!',
            text: 'You need to submit a receipt with the transaction.',
            type: 'info',
          });
        }
        else{
          this.swal({
            title: 'Success!',
            text: 'You have submitted a new transaction successfully',
            type: 'success'
          });
        }
      });
  }

  /**
   * Sends newly created gas transaction to backend
   */
  submitUsageForm(){

    for (let x = 0; x < this.uploader.queue.length; x++){
      this.tempItem = this.uploader.queue[x];
    }

    if(this.uploader.queue.length !== 0) {
      this.tempItem.upload();
    }
  }

  /**
   * Method used to format date in the format YYYY-MM-DD
   */
  onDateChange() {
    this.newCardUsage.date = moment(this.temp_date).format('YYYY-M-D');
  }

  /**
   * Requests card usages to service with filter object provided.
   * @return {Promise<Object>}
   */
  getCardsUsages() {
    return this.cardUsageService.getCardsUsages();
  }

  /**
   * Requests card usages of a single card to service with id provided.
   * @param {number} id Numerical value assigned by API
   * @return {Promise<Object>}
   */
  getSingleCardUsages(id) {
    return this.cardUsageService.getSingleCardUsages(id);
  }

  /**
   * Requests modification of a specific card usage to service,
   * with id of desired
   * @param {number} id Numerical value assigned by API
   * @return {Promise<Object>}
   */
  editCardUsage(id) {
    return this.cardUsageService.editCardUsage(id)
      .then(() => {
        this.$state.go('dashboard.cards.view.card-usage');
      });
  }

  /**
   * Requests card usages of a single card to service with id provided,
   * paginated for presentation purposes.
   * @return {Promise<Object>}
   */
  getPaginatedSingleCardUsages(){
    return this.cardUsageService.getSingleCardUsages(this.$stateParams.id, this.pageQuery)
      .then( () => {
        this.singleCardUsages = this.cardUsageService.singleCardUsages;
      });
  }

  /**
   * Gets currently logged user
   * @returns {Object|null}
   */
  getUser() {
    return this.authService.getUser();
  }
}
