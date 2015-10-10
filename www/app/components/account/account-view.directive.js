export default function acAccountView() {
	return {
		restrict : "E",
		controller : "AccountCtrl",
		controllerAs : "viewCtrl",
		bindToController : true,
		// scope must be inherited and not isolated for angular-ui-router to work
		scope : true,
		templateUrl : "app/components/account/tab-account.html"
	};
}

acAccountView.$inject = [];
