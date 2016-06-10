import angular from "angular";

import ToastSvc from "./toast.service";

export const module = angular.module("app.toast", []);
export default module.name;

module
	.service("ToastSvc", ToastSvc)
;
