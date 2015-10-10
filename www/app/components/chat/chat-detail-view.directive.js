export default function acChatDetailView() {
	return {
		restrict : "E",
		controller : "ChatDetailCtrl",
		controllerAs : "viewCtrl",
		bindToController : true,
		// scope must be inherited and not isolated for angular-ui-router to work
		scope : true,
		templateUrl : "app/components/chat/chat-detail.html"
	};
}

acChatDetailView.$inject = [];
