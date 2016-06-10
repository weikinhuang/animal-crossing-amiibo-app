import angular from "angular";

import constantsModule from "./global/constants";
import localStorageModule from "./global/local-storage";
import vibrateModule from "./global/vibrate";

export const module = angular.module("core.core-components", [
	constantsModule,
	localStorageModule,
	vibrateModule
]);
export default module.name;
