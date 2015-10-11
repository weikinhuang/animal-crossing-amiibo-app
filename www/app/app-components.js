import angular from "angular";

import dashModule from "./components/dash/dash.module";
import frameModule from "./components/frame/frame.module";
import waveListModule from "./components/wave-list/wave-list.module";

export const module = angular.module("core.app-components", [
	dashModule,
	frameModule,
	waveListModule
]);
export default module.name;
