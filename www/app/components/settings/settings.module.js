import angular from "angular";

import SettingsCtrl from "./settings.controller.js";

export const module = angular.module("app.settings", []);
export default module.name;

export const routeTemplate = "app/components/settings/settings-view.html";
export const routeController = "SettingsCtrl";

module
	.controller("SettingsCtrl", SettingsCtrl)
;
