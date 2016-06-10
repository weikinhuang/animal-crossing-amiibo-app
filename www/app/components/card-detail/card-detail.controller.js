import ngInjectDecorator from "../../decorators/ng-inject";

export default class CardDetailCtrl {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);

		this.seriesId = this.$stateParams.seriesId;
		this.cardId = this.$stateParams.cardId;

		this.$ionicLoading.show();

		this.WaveListSvc.load(this.seriesId)
			.then((data) => {
				this.$ionicLoading.hide();
				// find card
				let selectedCard = null;
				data.cards.some((card) => {
					/* eslint eqeqeq: 0 */
					if (this.cardId == card.id) {
						selectedCard = card;
						return true;
					}
					return false;
				});

				if (selectedCard !== null) {
					this.selectedCard = selectedCard;
				} else {
					this.$location.path("/app/home");
				}
			})
			.catch(() => {
				this.$ionicLoading.hide();
				// redirect to home...
				this.$location.path("/app/home");
			});
	}

	toggleCardOwnership() {
		this.WaveListSvc.markOwnership(this.selectedCard, !this.selectedCard.isOwned)
			.then((card) => {
				this.$vibrate.vibrate(50);
				this.ToastSvc.show(`${card.isOwned ? "Added" : "Removed"} ${card.name} (Undo?)`, () => {
					this.toggleCardOwnership(card);
				});
			});
	}
}

CardDetailCtrl.$inject = [
	"$ionicLoading",
	"$location",
	"$stateParams",
	"$vibrate",
	"ToastSvc",
	"WaveListSvc"
];
