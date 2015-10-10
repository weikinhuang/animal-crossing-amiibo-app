export default class ChatDetailCtrl {

	/**
	 * Constructor
	 * @param {$scope} $scope
	 * @param {$stateParams} $stateParams
	 * @param {Chats} Chats
	 */
	constructor($scope, $stateParams, Chats) {
		$scope.chat = Chats.get($stateParams.chatId);
	}
}

ChatDetailCtrl.$inject = [
	"$scope",
	"$stateParams",
	"Chats"
];
