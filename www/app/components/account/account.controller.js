export default class AccountCtrl {

	/**
	 * Constructor
	 * @param {$scope} $scope
	 */
	constructor($scope) {
		$scope.settings = {
			enableFriends : true
		};
	}
}

AccountCtrl.$inject = [
	"$scope"
];
