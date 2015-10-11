import angular from "angular";

import constantsModule from "./global/constants";
import localStorageModule from "./global/local-storage";

export const module = angular.module("core.core-components", [
	constantsModule,
	localStorageModule
]);
export default module.name;
