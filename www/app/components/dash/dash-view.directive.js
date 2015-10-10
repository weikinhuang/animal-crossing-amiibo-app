export default function acDashView() {
	return {
		restrict : "E",
		controller : "DashCtrl",
		controllerAs : "viewCtrl",
		bindToController : true,
		// scope must be inherited and not isolated for angular-ui-router to work
		scope : true,
		templateUrl : "app/components/dash/tab-dash.html"
	};
}

acDashView.$inject = [];
