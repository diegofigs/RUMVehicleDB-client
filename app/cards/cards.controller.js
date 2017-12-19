/**
 * Created by diegofigs on 1/31/17.
 */
export default class CardsController {
  /** @ngInject */
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

  createCard() {
    this.newCard.custodian_id = this.authService.getUser().id;
    return this.cardsService.createCard(this.newCard)
      .then(() => {
      this.$state.go('dashboard.cards.list');
    });
  }

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

  deleteCard(card) {
    return this.cardsService.deleteCard(card)
      .then(() => {
      this.$state.reload();
    });
  }

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

  editCard() {
    return this.cardsService.editCard(this.card)
      .then(() => {
      this.$state.go('dashboard.cards.list');
    });
  }

  applyFilter() {
    return this.cardsService.getCards(this.filter)
      .then( () => {
        this.cards = this.cardsService.cards;
      });
  }

  getUser() {
    return this.authService.getUser();
  }
}
