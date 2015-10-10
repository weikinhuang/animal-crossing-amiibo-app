import angular from "angular";

import DashCtrl from "./dash.controller";
import acDashView from "./dash-view.directive";

export const module = angular.module("app.dash", []);
export default module.name;

module
	.controller("DashCtrl", DashCtrl)
	.directive("acDashView", acDashView)
;
