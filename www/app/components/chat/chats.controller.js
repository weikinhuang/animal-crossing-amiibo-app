export default class ChatsCtrl {

	/**
	 * Constructor
	 * @param {$scope} $scope
	 * @param {ChatsSvc} ChatsSvc
	 */
	constructor($scope, ChatsSvc) {
		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//
		// $scope.$on('$ionicView.enter', function(e) {
		// });

		$scope.chats = ChatsSvc.all();
		$scope.remove = function(chat) {
			ChatsSvc.remove(chat);
		};
	}
}

ChatsCtrl.$inject = [
	"$scope",
	"ChatsSvc"
];
