import angular from "angular";

import CardDetailCtrl from "./card-detail.controller.js";

export const module = angular.module("app.card-detail", []);
export default module.name;

export const routeTemplate = "app/components/card-detail/card-detail-view.html";
export const routeController = "CardDetailCtrl";

module
	.controller("CardDetailCtrl", CardDetailCtrl)
;
