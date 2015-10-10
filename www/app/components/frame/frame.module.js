import angular from "angular";

import acFrameView from "./frame-view.directive";

export const module = angular.module("app.frame", []);
export default module.name;

module
	.directive("acFrameView", acFrameView)
;

