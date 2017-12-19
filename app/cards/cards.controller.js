/**
 * Created by diegofigs on 1/31/17.
 */

/**
 * Cards Controller is in charge of all the business logic related to Credit Cards
 */
export default class CardsController {
  constructor($state, $log,
              AuthService, CardsService, UsersService, DepartmentsService, swal) {
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
    this.custodianNames = this.usersService.users;

    this.cardTypeOptions = ["Regular", "Premium", "Diesel", "Spare"];
    this.cardStatusOptions = ["Active", "Inactive"];

    this.filter = {
      department_id: '',
      custodian_id: '',
      type: '',
      status: ''
    };
  }

  /**
   * If card creation is successful, shows user success feedback
   * If card creation is unsuccessful, shows user error feedback
   */
  confirmCardCreation(){

    this.createCard()
      .then(() => {
        this.swal({
          title: 'Card was successfully created!',
          type: 'success'
        });
      })
      .catch((error) => {
        this.swal({
          title: 'Error: Card could not be created',
          type: 'error'
        });
      });
  }

  /**
   * Sends card to be created to the Card Service
   */
  createCard() {
    this.newCard.custodian_id = this.authService.getUser().id;
    return this.cardsService.createCard(this.newCard)
      .then(() => {
      this.$state.go('dashboard.cards.list');
    });
  }

  /**
   * If card deletion is successful, shows user success feedback
   * If card deletion is unsuccessful, shows user error feedback
   * @param card Card to be deleted
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
   * Sends card to be deleted to the Card Service
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
   * Sends card to be edited to the Card Service
   */
  editCard() {
    return this.cardsService.editCard(this.card)
      .then(() => {
      this.$state.go('dashboard.cards.list');
    });
  }

  /**
   * Requests Card Service a list of cards with filter parameters applied
   */
  applyFilter() {
    return this.cardsService.getCards(this.filter)
      .then( () => {
        this.cards = this.cardsService.cards;
      });
  }

  /**
   * Gets current user
   * @returns {Object} current user object
   */
  getUser() {
    return this.authService.getUser();
  }
}
