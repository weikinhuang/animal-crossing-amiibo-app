import { routeTemplate as frameRouteTemplate, routeController as frameRouteController } from "./components/frame/frame.module";
import { routeTemplate as dashRouteTemplate, routeController as dashRouteController } from "./components/dash/dash.module";
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

		.state("app.dash", {
			url : "/dash",
			views : {
				content : {
					templateUrl : dashRouteTemplate,
					controller : `${dashRouteController} as viewCtrl`
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
	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("/app/dash");
}

export default [
	"$stateProvider",
	"$urlRouterProvider",
	routerConfig
];
