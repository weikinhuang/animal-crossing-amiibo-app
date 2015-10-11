import angular from "angular";

import WaveListCtrl from "./wave-list.controller";
import WaveListSvc from "./wave-list.service";

export const module = angular.module("app.wave-list", []);
export default module.name;

export const routeTemplate = "app/components/wave-list/wave-list-view.html";
export const routeController = "WaveListCtrl";

module
	.controller("WaveListCtrl", WaveListCtrl)
	.service("WaveListSvc", WaveListSvc)
;
