/**
 * Handle creating named injections into class instance
 * @param {*} instance
 * @param {Array} args
 */
export default function ngInjectDecorator(instance, args) {
	if (!instance ||
		args.length === 0 ||
		!Array.isArray(instance.constructor.$inject) ||
		instance.constructor.$inject.length === 0
	) {
		return;
	}
	instance.constructor.$inject
		.forEach((injected, idx) => {
			Object.defineProperty(instance, injected, {
				enumerable : false,
				configurable : false,
				writable : false,
				value : args[idx]
			});
		});
}
