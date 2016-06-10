import Fuse from "fuse.js";
import ngInjectDecorator from "../../decorators/ng-inject";

export default class WaveListCtrl {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);

		this.seriesId = this.$stateParams.seriesId;
		this.viewState = "grid";
		this.isFilteringOwned = false;
		this.searchShown = false;
		this.searchFilter = "";
		this.setNotReleased = !this.WaveListSvc.isValidSeries(this.seriesId);

		this.$ionicLoading.show();
		this.isLoading = true;

		this.$scope.$on("$ionicView.enter", this.$ionicViewEnter.bind(this));

		this.loadData();
	}

	$ionicViewEnter() {
		if (this.isLoading || !this.cards) {
			return;
		}
		this.WaveListSvc.mergeOwnedCardData({
			cards : this.cards
		});
	}

	loadData() {
		let loadPromise;
		if (this.seriesId === "all") {
			loadPromise = this.WaveListSvc.loadAllSeries();
		} else {
			loadPromise = this.WaveListSvc.load(this.seriesId);
		}
		return loadPromise
			.then((data) => {
				this.$ionicLoading.hide();
				this.isLoading = false;
				this.processSeriesData(data);
			})
			.catch(() => {
				// series not released...
				this.$ionicLoading.hide();
				this.isLoading = false;
			});
	}

	processSeriesData(data) {
		this.cards = data.cards;
		this.visibleCards = this.cards.slice(0);
		this.fuseIndex = new Fuse(this.cards.slice(0), {
			keys : ["name"],
			shouldSort : true /* sort by score */
		});
	}

	toggleCardOwnership(card) {
		this.WaveListSvc.markOwnership(card, !card.isOwned)
			.then(() => {
				this.$vibrate.vibrate(50);
				this.ToastSvc.show(`${card.isOwned ? "Added" : "Removed"} ${card.name} (Undo?)`, () => {
					this.toggleCardOwnership(card);
				});
			});
	}

	toggleOnlyOwned() {
		this.isFilteringOwned = !this.isFilteringOwned;
		if (this.isFilteringOwned) {
			this.visibleCards = this.cards.filter((card) => !card.isOwned);
		} else {
			this.visibleCards = this.cards.slice(0);
		}
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
	"$scope",
	"$stateParams",
	"$timeout",
	"$vibrate",
	"ToastSvc",
	"WaveListSvc"
];
