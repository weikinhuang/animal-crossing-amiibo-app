import { routeTemplate as frameRouteTemplate, routeController as frameRouteController } from "./components/frame/frame.module";
import { routeTemplate as dashRouteTemplate, routeController as dashRouteController } from "./components/dash/dash.module";

function routerConfig($stateProvider, $urlRouterProvider) {
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

		.state("app", {
			url : "/app",
			abstract : true,
			templateUrl : frameRouteTemplate,
			controller : `${frameRouteController} as viewCtrl`
		})

		.state("app.dash", {
			url : "/dash",
			views : {
				content : {
					templateUrl : dashRouteTemplate,
					controller : `${dashRouteController} as viewCtrl`
				}
			}
		})

		.state("app.chats", {
			url : "/chats",
			views : {
				content : {
					template : "<ac-chats-view></ac-chats-view>"
				}
			}
		})
		.state("app.chat-detail", {
			url : "/chats/:chatId",
			views : {
				content : {
					template : "<ac-chat-detail-view></ac-chat-detail-view>"
				}
			}
		})

		.state("app.account", {
			url : "/account",
			views : {
				content : {
					template : "<ac-account-view></ac-account-view>"
				}
			}
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("/app/dash");
}

export default [
	"$stateProvider",
	"$urlRouterProvider",
	routerConfig
];
