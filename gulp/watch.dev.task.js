"use strict";

var gulp = require("gulp");

module.exports.isWatching = false;
module.exports.isWatchTask = false;

gulp.task("dev", function() {
	gulp.watch([
		"./www/app/**/*.{js,html}"
	], ["watch:js"]);

	gulp.watch([
		"gulp/**/*.js",
		"hooks/**/*.js",
		"Gulpfile.js",
		"!hooks/after_prepare/010_add_platform_class.js"
	], ["eslint:build"]);

	gulp.watch([
		"public/static/app/**/*.{css,less}"
	], ["less"]);
});
