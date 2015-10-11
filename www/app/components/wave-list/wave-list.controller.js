import ngInjectDecorator from "../../decorators/ng-inject";

export default class WaveListCtrl {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);

		this.seriesId = this.$stateParams.wave;
		this.$ionicLoading.show();

		this.WaveListSvc.load(this.seriesId)
			.then((data) => {
				this.$ionicLoading.hide();
				this.processSeriesData(data);
			})
			.catch(() => {
				// series not released...
			});
	}

	processSeriesData(data) {
		this.cards = data.cards;
		console.log(this.cards[0]);
	}
}

WaveListCtrl.$inject = [
	"$ionicLoading",
	"$stateParams",
	"WaveListSvc"
];
