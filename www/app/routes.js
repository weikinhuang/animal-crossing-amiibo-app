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
			template : "<ac-frame-view></ac-frame-view>"
		})

		// Each tab has its own nav history stack:

		.state("tab.dash", {
			url : "/dash",
			views : {
				"tab-dash" : {
					template : "<ac-dash-view></ac-dash-view>"
				}
			}
		})

		.state("tab.chats", {
			url : "/chats",
			views : {
				"tab-chats" : {
					template : "<ac-chats-view></ac-chats-view>"
				}
			}
		})
		.state("tab.chat-detail", {
			url : "/chats/:chatId",
			views : {
				"tab-chats" : {
					template : "<ac-chat-detail-view></ac-chat-detail-view>"
				}
			}
		})

		.state("tab.account", {
			url : "/account",
			views : {
				"tab-account" : {
					template : "<ac-account-view></ac-account-view>"
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
