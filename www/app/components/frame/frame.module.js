import angular from "angular";

import FrameViewCtrl from "./frame-view.controller";
import acFrameView from "./frame-view.directive";

export const module = angular.module("app.frame", []);
export default module.name;

module
	.controller("FrameViewCtrl", FrameViewCtrl)
	.directive("acFrameView", acFrameView)
;

