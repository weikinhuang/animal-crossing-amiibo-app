import ngInjectDecorator from "../../decorators/ng-inject";

export default class WaveListSvc {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);

		this.cache = this.$cacheFactory("wave-list");
		this.httpPromises = {};
	}

	load(seriesId) {
		if (!seriesId || seriesId < 1 || seriesId > this.LATEST_SERIES) {
			return this.$q.reject(new Error("unspecified series"));
		}
		const cachedData = this.cache.get(seriesId);
		if (cachedData) {
			return this.$q.resolve(cachedData);
		}
		if (!this.httpPromises[seriesId]) {
			this.httpPromises[seriesId] = this.$http.get(`data/wave-${seriesId}.json`)
				.then((data) => {
					this.cache.put(seriesId, data.data);
					return data.data;
				})
				.then((data) => {
					const ownedCardsInSeries = this.loadOwnedCardData(seriesId);
					data.cards.forEach((card) => {
						card.isOwned = !!ownedCardsInSeries[card.id];
					});
					return data;
				});
		}
		return this.httpPromises[seriesId];
	}

	loadOwnedCardData(seriesId) {
		const ownedCards = this.$localStorage.get("card-ownership-storage") || {};
		return ownedCards[seriesId] || {};
	}

	markOwnership(seriesId, card, isOwned = true) {
		if (!seriesId || seriesId < 1 || seriesId > this.LATEST_SERIES) {
			return;
		}
		const ownedCards = this.$localStorage.get("card-ownership-storage") || {};
		if (!ownedCards[seriesId]) {
			ownedCards[seriesId] = {};
		}
		ownedCards[seriesId][card.id] = !!isOwned;
		card.isOwned = !!isOwned;

		this.$localStorage.set("card-ownership-storage", ownedCards);
	}
}

WaveListSvc.$inject = [
	"$cacheFactory",
	"$http",
	"$localStorage",
	"$q",
	"LATEST_SERIES"
];
