// core
import angular from "angular";

// app
import constantsModule from "./global/constants";
import moduleName from "./name";
import routes from "./routes";

// components
console.log("hi");

const injectables = [];

injectables.push(...[
	// core angular
	"ngAnimate",
	"ngSanitize",
	"ngTouch",

	// ionic
	"ionic",

	// app framework
	constantsModule,

	// app components
	"starter.controllers",
	"starter.services"
]);

angular.module(moduleName + ".exceptionHandler", [])
	.factory("$exceptionHandler", function() {
		return function(e) {
			// show crash notice...
			throw e;
		};
	});
injectables.push(moduleName + ".exceptionHandler");

// create the core module
angular.module(moduleName, injectables);

// initial configuration
angular.module(moduleName)
	.run([
		"$ionicPlatform", "$window",
		function($ionicPlatform, $window) {
			$ionicPlatform.ready(function() {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.Keyboard) {
					$window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					$window.cordova.plugins.Keyboard.disableScroll(true);

				}
				if ($window.StatusBar) {
					// org.apache.cordova.statusbar required
					$window.StatusBar.styleLightContent();
				}
			});
		}
	]);

// app routing
angular.module(moduleName).config(routes);

// export app
export default angular.module(moduleName);
