import angular from "angular";

export const module = angular
	.module("core.local-storage", []);

export default module.name;

module
	.factory("$localStorage", [
		"$window",
		function($window) {
			return {
				get : function(key) {
					try {
						return JSON.parse($window.localStorage.getItem(key));
					} catch (e) {
						return null;
					}
				},
				set : function(key, value) {
					$window.localStorage.setItem(key, JSON.stringify(value));
				},
				remove : function(key) {
					$window.localStorage.removeItem(key);
				}
			};
		}
	])
;
