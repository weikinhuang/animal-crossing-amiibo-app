import angular from "angular";

import FrameViewCtrl from "./frame-view.controller";

export const module = angular.module("app.frame", []);
export default module.name;

export const routeTemplate = "app/components/frame/frame.html";
export const routeController = "FrameViewCtrl";

module
	.controller("FrameViewCtrl", FrameViewCtrl)
;

