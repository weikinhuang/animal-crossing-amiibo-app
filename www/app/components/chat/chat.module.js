import angular from "angular";

import ChatsCtrl from "./chats.controller";
import ChatDetailCtrl from "./chat-detail.controller";
import ChatsSvc from "./chat.service";

export const module = angular.module("app.chat", []);
export default module.name;

module
	.controller("ChatsCtrl", ChatsCtrl)
	.controller("ChatDetailCtrl", ChatDetailCtrl)
	.factory("Chats", ChatsSvc)
;

