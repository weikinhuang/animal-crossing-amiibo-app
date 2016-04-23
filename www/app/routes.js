import { routeTemplate as frameRouteTemplate, routeController as frameRouteController } from "./components/frame/frame.module";
import { routeTemplate as cardDetailRouteTemplate, routeController as cardDetailRouteController } from "./components/card-detail/card-detail.module";
import { routeTemplate as homeRouteTemplate, routeController as homeRouteController } from "./components/home/home.module";
import { routeTemplate as settingsRouteTemplate, routeController as settingsRouteController } from "./components/settings/settings.module";
import { routeTemplate as waveListRouteTemplate, routeController as waveListRouteController } from "./components/wave-list/wave-list.module";

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

		.state("app.home", {
			url : "/home.disabled",
			views : {
				content : {
					templateUrl : homeRouteTemplate,
					controller : `${homeRouteController} as viewCtrl`
				}
			}
		})

		.state("app.settings", {
			url : "/settings",
			views : {
				content : {
					templateUrl : settingsRouteTemplate,
					controller : `${settingsRouteController} as viewCtrl`
				}
			}
		})

		.state("app.wave-list", {
			url : "/wave-list/:seriesId",
			views : {
				content : {
					templateUrl : waveListRouteTemplate,
					controller : `${waveListRouteController} as viewCtrl`
				}
			}
		})

		.state("app.card-detail", {
			url : "/card-detail/:seriesId/:cardId",
			views : {
				content : {
					templateUrl : cardDetailRouteTemplate,
					controller : `${cardDetailRouteController} as viewCtrl`
				}
			}
		})
	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("/app/wave-list/all");
}

export default [
	"$stateProvider",
	"$urlRouterProvider",
	routerConfig
];
