import angular from "angular";

export const module = angular
	.module("core.constants", []);

export default module.name;


module
	.constant("APP_VERSION", "1.0.2")
	.constant("LATEST_SERIES", 2)
	.constant("MIN_CARD_ID", 1)
	.constant("MAX_CARD_ID", 200)
;
