import angular from "angular";

import AccountCtrl from "./account.controller";
import acAccountView from "./account-view.directive";

export const module = angular.module("app.account", []);
export default module.name;

module
	.controller("AccountCtrl", AccountCtrl)
	.directive("acAccountView", acAccountView)
;
