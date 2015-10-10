export default class ChatDetailCtrl {

	/**
	 * Constructor
	 * @param {$scope} $scope
	 * @param {$stateParams} $stateParams
	 * @param {ChatsSvc} ChatsSvc
	 */
	constructor($scope, $stateParams, ChatsSvc) {
		$scope.chat = ChatsSvc.get($stateParams.chatId);
	}
}

ChatDetailCtrl.$inject = [
	"$scope",
	"$stateParams",
	"ChatsSvc"
];
