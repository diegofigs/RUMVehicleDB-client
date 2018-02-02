/**
 * Cards Controller is in charge of presentation and validation logic
 * for card related states and interactions.
 */
export default class CardsController {
  /**
   * Constructs a new instance of CardsController and initializes it.
   * @param $state
   * @param $log
   * @param AuthService
   * @param CardsService
   * @param UsersService
   * @param DepartmentsService
   * @param swal
   */
  constructor($state, $log, AuthService, CardsService,
              UsersService, DepartmentsService, swal) {
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;
    this.cardsService = CardsService;
    this.usersService = UsersService;
    this.departmentsService = DepartmentsService;
    this.swal = swal;
    this.card = this.cardsService.card;
    this.cards = this.cardsService.cards;
    this.departments = this.departmentsService.departments;
    this.newCard = {};
    this.nonPaginatedUsers = this.usersService.nonPaginatedUsers;

    this.cardTypeOptions = ["Regular", "Premium", "Diesel", "Spare"];
    this.cardStatusOptions = ["Active", "Inactive"];

    this.filter = {
      department_id: '',
      custodian_id: '',
      type: '',
      status: 'Active',
      page: 1,
    };

    this.pagination = {
      pageSize: this.cardsService.pageSize,
      total: this.cardsService.total,
    };
  }

  /**
   * Asks for user confirmation before actually processing creation.
   */
  confirmCardCreation(){
    this.createCard()
      // If card creation is successful, shows user success feedback
      .then(() => {
        this.swal({
          title: 'Card was successfully created!',
          type: 'success'
        });
      })
      // If card creation is unsuccessful, shows user error feedback
      .catch((error) => {
        this.swal({
          title: 'Error: Card could not be created',
          type: 'error'
        });
      });
  }

  /**
   * Requests card creation to service, providing the Card object.
   * @return {Promise<Object>}
   */
  createCard() {
    return this.cardsService.createCard(this.newCard)
      .then(() => {
      this.$state.go('dashboard.cards.list');
    });
  }

  /**
   * Asks for user confirmation before actually processing deletion.
   * @param {Object} card Card to be deleted
   */
  confirmCardDeletion(card){

    this.swal({
      title: 'Do you really want to delete this card?',
      type: 'warning',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#4caf50',
      showCancelButton: 'true',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#f44336',
    }).then(() => {

      this.deleteCard(card)
        .then(() => {
          this.swal({
            title: 'Card has been deleted',
            type: 'success'
          });
        })
        .catch((error) => {
          this.swal({
            title: 'Error: Card could not be deleted',
            type: 'error'
          });
        });
    });
  }

  /**
   * Requests card deletion to service, providing
   * desired Card object.
   * @return {Promise<Object>}
   */
  deleteCard(card) {
    return this.cardsService.deleteCard(card)
      .then(() => {
      this.$state.reload();
    });
  }

  /**
   * If card edition is successful, shows user success feedback
   * If card edition is unsuccessful, shows user error feedback
   */
  confirmCardEdition(){

      this.editCard()
        .then(() => {
          this.swal({
            title: 'Card was successfully edited!',
            type: 'success'
          });
        })
        .catch((error) => {
          this.swal({
            title: 'Error: Card could not be edited',
            type: 'error'
          });
        });
    }

  /**
   * Requests card modification to service, providing
   * modified Card object.
   * @return {Promise<Object>}
   */
  editCard() {
    return this.cardsService.editCard(this.card)
      .then(() => {
      this.$state.go('dashboard.cards.list');
    });
  }

  /**
   * Requests cards to service with filter object provided,
   * synchronizes pagination metadata on success.
   * @return {Promise<Object>}
   */
  applyCardsFilter() {
    return this.cardsService.getCards(this.filter)
      .then( () => {
        this.pagination.pageSize = this.cardsService.pageSize;
        this.pagination.total = this.cardsService.total;
        this.cards = this.cardsService.cards;
      });
  }

  /**
   * Gets currently logged user
   * @returns {Object|null}
   */
  getUser() {
    return this.authService.getUser();
  }

  /**
   * Reloads view in order to reset/clear filter parameters
   */
  reload(){
    this.$state.reload();
  }

  /**
   * Using moment library, formats date string into 'MMMM YYYY' format
   * @param {string} date Date in string format
   * @return {string}
   */
  static formatExpirationDateForMarkup(date){
    return moment(date).format('MMMM YYYY');
  }
}
