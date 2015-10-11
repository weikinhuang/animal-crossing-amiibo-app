import angular from "angular";

import DashCtrl from "./dash.controller";

export const module = angular.module("app.dash", []);
export default module.name;

export const routeTemplate = "app/components/dash/dash-view.html";
export const routeController = "DashCtrl";

module
	.controller("DashCtrl", DashCtrl)
;
