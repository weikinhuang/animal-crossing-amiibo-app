import angular from "angular";

export const module = angular
	.module("core.vibrate", []);

export default module.name;

const noop = () => false;

module
	.factory("$vibrate", [
		"$window",
		function($window) {
			if (!("vibrate" in $window.navigator)) {
				return {
					vibrate : noop,
					cancelVibration : noop
				};
			}
			return {
				vibrate : function(times) {
					return navigator.vibrate(times);
				},
				cancelVibration : function() {
					return navigator.vibrate(0);
				}
			};
		}
	])
;
