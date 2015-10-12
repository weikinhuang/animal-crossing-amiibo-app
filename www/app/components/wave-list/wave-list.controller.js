import ngInjectDecorator from "../../decorators/ng-inject";

export default class WaveListCtrl {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);

		this.seriesId = this.$stateParams.wave;
		this.isFilteringOwned = false;
		this.searchShown = false;

		this.$ionicLoading.show();

		this.WaveListSvc.load(this.seriesId)
			.then((data) => {
				this.$ionicLoading.hide();
				this.processSeriesData(data);
			})
			.catch(() => {
				// series not released...
				this.$ionicLoading.hide();
			});
	}

	processSeriesData(data) {
		this.cards = data.cards;
		this.visibleCards = this.cards.slice(0);
		console.log(this.cards[0]);
	}

	toggleCardOwnership(card) {
		this.WaveListSvc.markOwnership(this.seriesId, card, !card.isOwned);
	}

	toggleOnlyOwned() {
		this.isFilteringOwned = !this.isFilteringOwned;
	}

	showSearch() {
		this.searchShown = true;
		this.$timeout(() => {
			this.$ionicScrollDelegate.resize();
		}, 1000);
	}

	hideSearch() {
		this.searchShown = false;
		this.$timeout(() => {
			this.$ionicScrollDelegate.resize();
		}, 1000);
	}
}

WaveListCtrl.$inject = [
	"$ionicLoading",
	"$ionicScrollDelegate",
	"$stateParams",
	"$timeout",
	"WaveListSvc"
];
