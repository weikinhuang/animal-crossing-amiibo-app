import Fuse from "fuse.js";
import ngInjectDecorator from "../../decorators/ng-inject";

export default class WaveListCtrl {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);

		this.seriesId = parseInt(this.$stateParams.seriesId, 10);
		this.isFilteringOwned = false;
		this.searchShown = false;
		this.searchFilter = "";
		this.setNotReleased = this.seriesId > this.LATEST_SERIES;

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
		this.fuseIndex = new Fuse(this.cards.slice(0), { keys : ["name"] });
	}

	toggleCardOwnership(card) {
		this.WaveListSvc.markOwnership(this.seriesId, card, !card.isOwned);
	}

	toggleOnlyOwned() {
		this.isFilteringOwned = !this.isFilteringOwned;
	}

	showSearch() {
		this.searchShown = true;
	}

	hideSearch() {
		this.searchShown = false;
		this.searchFilter = "";
		this.visibleCards = this.cards.slice(0);
		// force scroll to top
		this.$timeout(() => {
			this.$ionicScrollDelegate.scrollTop();
		});
	}

	filterCards() {
		const phrase = this.searchFilter;
		// force scroll to top
		this.$timeout(() => {
			this.$ionicScrollDelegate.scrollTop();
		});
		// nothing to search against
		if (!phrase) {
			this.visibleCards = this.cards.slice(0);
			return;
		}
		// we're looking for a number
		if ((/^\d+$/).test(phrase)) {
			const idx = parseInt(phrase, 10) - 1;
			this.visibleCards = [];
			if (this.cards[idx]) {
				this.visibleCards.push(this.cards[idx]);
			}
			return;
		}
		this.visibleCards = this.fuseIndex.search(phrase);
	}
}

WaveListCtrl.$inject = [
	"$ionicLoading",
	"$ionicScrollDelegate",
	"$stateParams",
	"$timeout",
	"WaveListSvc",
	"LATEST_SERIES"
];
