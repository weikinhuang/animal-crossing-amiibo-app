import ngInjectDecorator from "../../decorators/ng-inject";

export default class CardDetailCtrl {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);

		this.seriesId = parseInt(this.$stateParams.seriesId, 10);
		this.cardId = parseInt(this.$stateParams.cardId, 10);

		this.$ionicLoading.show();

		this.WaveListSvc.load(this.seriesId)
			.then((data) => {
				this.$ionicLoading.hide();
				if (data.cards[this.cardId - 1]) {
					this.selectedCard = data.cards[this.cardId - 1];
				} else {
					throw new Error("Card does not exist.");
				}
			})
			.catch(() => {
				this.$ionicLoading.hide();
			});
	}

	toggleCardOwnership() {
		this.WaveListSvc.markOwnership(this.seriesId, this.selectedCard, !this.selectedCard.isOwned);
	}
}

CardDetailCtrl.$inject = [
	"$ionicLoading",
	"$stateParams",
	"WaveListSvc"
];
