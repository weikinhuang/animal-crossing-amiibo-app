function routerConfig($stateProvider, $urlRouterProvider) {
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

		// setup an abstract state for the tabs directive
		.state("tab", {
			url : "/tab",
			abstract : true,
			templateUrl : "app/components/frame/tabs.html"
		})

		// Each tab has its own nav history stack:

		.state("tab.dash", {
			url : "/dash",
			views : {
				"tab-dash" : {
					templateUrl : "app/components/dash/tab-dash.html",
					controller : "DashCtrl"
				}
			}
		})

		.state("tab.chats", {
			url : "/chats",
			views : {
				"tab-chats" : {
					templateUrl : "app/components/chat/tab-chats.html",
					controller : "ChatsCtrl"
				}
			}
		})
		.state("tab.chat-detail", {
			url : "/chats/:chatId",
			views : {
				"tab-chats" : {
					templateUrl : "app/components/chat/chat-detail.html",
					controller : "ChatDetailCtrl"
				}
			}
		})

		.state("tab.account", {
			url : "/account",
			views : {
				"tab-account" : {
					templateUrl : "app/components/account/tab-account.html",
					controller : "AccountCtrl"
				}
			}
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("/tab/dash");
}

export default [
	"$stateProvider",
	"$urlRouterProvider",
	routerConfig
];
