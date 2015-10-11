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
		if (!seriesId) {
			console.log(seriesId);
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
				});
		}
		return this.httpPromises[seriesId];
	}
}

WaveListSvc.$inject = [
	"$cacheFactory",
	"$http",
	"$q"
];
