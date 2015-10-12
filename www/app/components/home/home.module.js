import angular from "angular";

import HomeCtrl from "./home.controller.js";

export const module = angular.module("app.home", []);
export default module.name;

export const routeTemplate = "app/components/home/home-view.html";
export const routeController = "HomeCtrl";

module
	.controller("HomeCtrl", HomeCtrl)
;
