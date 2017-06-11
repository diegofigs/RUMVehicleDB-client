/**
 * Created by diegofigs on 1/31/17.
 */
export default class CardsController {
  /** @ngInject */
  constructor($state, $log,
              AuthService, CardsService, DepartmentsService) {
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;
    this.cardsService = CardsService;
    this.departmentsService = DepartmentsService;

    this.card = this.cardsService.card;
    this.cards = this.cardsService.cards;
    this.departments = this.departmentsService.departments;
    this.newCard = {};
  }

  createCard() {
    this.newCard.custodian_id = this.authService.getUser().id;
    return this.cardsService.createCard(this.newCard)
      .then(() => {
      this.$state.go('dashboard.cards.list');
    });
  }

  deleteCard(card) {
    return this.cardsService.deleteCard(card)
      .then(() => {
      this.$state.reload();
    });
  }

  editCard() {
    return this.cardsService.editCard(this.card)
      .then(() => {
      this.$state.go('dashboard.cards.list');
    });
  }
}
