import angular from "angular";

import cardDetailModule from "./components/card-detail/card-detail.module";
import homeModule from "./components/home/home.module";
import frameModule from "./components/frame/frame.module";
import settingsModule from "./components/settings/settings.module";
import toastModule from "./components/toast/toast.module";
import waveListModule from "./components/wave-list/wave-list.module";

export const module = angular.module("core.app-components", [
	cardDetailModule,
	homeModule,
	frameModule,
	settingsModule,
	toastModule,
	waveListModule
]);
export default module.name;
