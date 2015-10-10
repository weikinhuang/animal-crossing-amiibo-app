import angular from "angular";

import constantsModule from "./global/constants";

export const module = angular.module("core.core-components", [
	constantsModule
]);
export default module.name;
