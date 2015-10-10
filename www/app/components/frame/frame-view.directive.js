export default function acFrameView() {
	return {
		restrict : "E",
		// controller : "FrameViewCtrl",
		// controllerAs : "viewCtrl",
		// bindToController : true,
		// scope must be inherited and not isolated for angular-ui-router to work
		scope : true,
		templateUrl : "app/components/frame/tabs.html"
	};
}

acFrameView.$inject = [];
