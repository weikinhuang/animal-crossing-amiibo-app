"use strict";

import ngInjectDecorator from "../../decorators/ng-inject";

const HUD_TEMPLATE = `
	<a class="toast-notif"
		ng-hide="viewCtrl.isHidden"
		ng-click="viewCtrl._click($event)"
	>
		<span class="notif-body">{{ viewCtrl.message }}</span>
	</a>
`;

const DEFAULT_TIMEOUT = 3000;

const noop = () => {};

export default class ToastSvc {

	constructor(...injected) {
		ngInjectDecorator(this, injected);

		const $scope = this.$rootScope.$new(true);
		$scope.viewCtrl = this;

		this.$hud = this.$compile(HUD_TEMPLATE)($scope);

		this.message = "";
		this.isHidden = true;
		this.hasAppended = false;
		this.hideTimer = null;
		this.clickAction = noop;
	}

	_append() {
		if (this.hasAppended) {
			return;
		}
		this.hasAppended = true;

		this.$ionicBody.append(this.$hud);
	}

	show(message, clickAction = noop) {
		this.isHidden = false;
		this.message = message;
		this.clickAction = clickAction;
		this.$timeout(() => {
			this._append();

			// clear out the timer
			if (this.hideTimer) {
				this.$timeout.cancel(this.hideTimer);
			}

			this.hideTimer = this.$timeout(() => {
				this.isHidden = true;
			}, DEFAULT_TIMEOUT);
		});
	}

	hide() {
		// clear out the timer
		if (this.hideTimer) {
			this.$timeout.cancel(this.hideTimer);
		}
		this.isHidden = true;
		this.clickAction = noop;
	}

	_click($e) {
		$e.preventDefault();
		this.clickAction(() => { this.hide(); });
	}
}

ToastSvc.$inject = [
	"$compile",
	"$rootScope",
	"$ionicBody",
	"$timeout"
];
