export default function acChatsView() {
	return {
		restrict : "E",
		controller : "ChatsCtrl",
		controllerAs : "viewCtrl",
		bindToController : true,
		// scope must be inherited and not isolated for angular-ui-router to work
		scope : true,
		templateUrl : "app/components/chat/tab-chats.html"
	};
}

acChatsView.$inject = [];
