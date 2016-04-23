import ngInjectDecorator from "../../decorators/ng-inject";

export default class SettingsCtrl {

	/**
	 * Constructor
	 */
	constructor(...injected) {
		ngInjectDecorator(this, injected);
	}

	confirmClearData() {
		this.$ionicPopup.confirm({
				title : "Delete all owned cards?",
				template : "Are you sure you want to delete all owned cards?"
			})
			.then((res) => {
				if (!res) {
					return this.$q.reject(new Error("Cancelled"));
				}
				return this.WaveListSvc.clearOwnershipData();
			})
			.then(() => {
				return this.$ionicHistory.clearCache();
			});
	}
}

SettingsCtrl.$inject = [
	"$ionicHistory",
	"$ionicPopup",
	"$q",
	"WaveListSvc"
];
