import angular from "angular";

import ChatsCtrl from "./chats.controller";
import ChatDetailCtrl from "./chat-detail.controller";
import ChatsSvc from "./chat.service";
import acChatsView from "./chats-view.directive";
import acChatDetailView from "./chat-detail-view.directive";

export const module = angular.module("app.chat", []);
export default module.name;

module
	.controller("ChatsCtrl", ChatsCtrl)
	.controller("ChatDetailCtrl", ChatDetailCtrl)
	.directive("acChatsView", acChatsView)
	.directive("acChatDetailView", acChatDetailView)
	.factory("ChatsSvc", ChatsSvc)
;

