import angular from "angular";

export const module = angular
	.module("core.constants", []);

export default module.name;


module
	.constant("LATEST_SERIES", 4)
	.constant("MIN_CARD_ID", 1)
	.constant("MAX_CARD_ID", 400)
;
