import angular from "angular";

import DashCtrl from "./dash.controller";

export const module = angular.module("app.dash", []);
export default module.name;

module
	.controller("DashCtrl", DashCtrl)
;
