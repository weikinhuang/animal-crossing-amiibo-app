import ngInjectDecorator from "../../decorators/ng-inject";

const CARD_OWNERSHIP_KEY = "card-ownership";

export default class WaveListSvc {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);

		this.cache = this.$cacheFactory("wave-list");
		this.httpPromises = {};
	}

	isValidSeries(seriesId) {
		if (!seriesId) {
			return false;
		}
		if (seriesId === "promo") {
			return true;
		}
		if (seriesId < 1 || seriesId > this.LATEST_SERIES) {
			return false;
		}
		return true;
	}

	loadAllSeries() {
		const allSeries = [];
		for (let i = 1; i <= this.LATEST_SERIES; i++) {
			allSeries.push(this.load(i));
		}
		return this.$q.all(allSeries)
			.then((data) => {
				const cards = [];
				data.forEach((series) => {
					cards.push(...series.cards);
				});
				return {
					wave : "all",
					cards : cards
				};
			});
	}

	mergeOwnedCardData(data) {
		const ownedCards = this.getOwnedCardData();
		data.cards.forEach((card) => {
			card.isOwned = ownedCards[card.id] && ownedCards[card.id].owned;
		});
		return data;
	}

	load(seriesId) {
		if (seriesId === "all") {
			return this.loadAllSeries();
		}
		if (!this.isValidSeries(seriesId)) {
			return this.$q.reject(new Error("unspecified series"));
		}
		const cachedData = this.cache.get(seriesId);
		if (cachedData) {
			return this.$q.resolve(cachedData)
				.then(this.mergeOwnedCardData.bind(this));
		}
		if (!this.httpPromises[seriesId]) {
			this.httpPromises[seriesId] = this.$http.get(`data/wave-${seriesId}.json`)
				.then((data) => {
					this.cache.put(seriesId, data.data);
					return data.data;
				})
				.then(this.mergeOwnedCardData.bind(this));
		}
		return this.httpPromises[seriesId];
	}

	getOwnedCardData() {
		// get current key
		let ownedCards = this.$localStorage.get(CARD_OWNERSHIP_KEY);
		// default value
		if (ownedCards === null) {
			ownedCards = {};
		}
		return ownedCards;
	}

	setOwnedCardData(ownedCards) {
		this.$localStorage.set(CARD_OWNERSHIP_KEY, ownedCards);
	}

	markOwnership(card, isOwned = true) {
		if (!this.isValidSeries(card.wave)) {
			return;
		}
		const ownedCards = this.getOwnedCardData();
		if (!ownedCards[card.id]) {
			ownedCards[card.id] = {
				createdAt : new Date()
			};
		}
		ownedCards[card.id].owned = !!isOwned;
		ownedCards[card.id].updatedAt = new Date();
		card.isOwned = !!isOwned;

		this.setOwnedCardData(ownedCards);
	}

	clearOwnershipData() {
		return this.$q((resolve) => {
			this.$localStorage.remove(CARD_OWNERSHIP_KEY);
			resolve();
		});
	}
}

WaveListSvc.$inject = [
	"$cacheFactory",
	"$http",
	"$localStorage",
	"$q",
	"LATEST_SERIES"
];
