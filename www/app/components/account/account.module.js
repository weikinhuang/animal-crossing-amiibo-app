import angular from "angular";

import AccountCtrl from "./account.controller";

export const module = angular.module("app.account", []);
export default module.name;

module
	.controller("AccountCtrl", AccountCtrl)
;
