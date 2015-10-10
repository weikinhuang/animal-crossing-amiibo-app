import angular from "angular";

import accountModule from "./components/account/account.module";
import chatModule from "./components/chat/chat.module";
import dashModule from "./components/dash/dash.module";
import frameModule from "./components/frame/frame.module";

export const module = angular.module("core.app-components", [
	accountModule,
	chatModule,
	dashModule,
	frameModule
]);
export default module.name;
