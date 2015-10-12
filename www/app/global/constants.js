import angular from "angular";

export const module = angular
	.module("core.constants", []);

export default module.name;


module
	.constant("APP_VERSION", "1.0.0")
	.constant("LATEST_SERIES", 1)
;
