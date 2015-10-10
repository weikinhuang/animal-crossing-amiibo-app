"use strict";

var gulp = require("gulp");
var eslint = require("gulp-eslint");

var eslintOpts = {
	useEslintrc : true
};

gulp.task("eslint", [
	"eslint:web"
]);

gulp.task("eslint:web", function() {
	var cached = require("gulp-cached");
	return gulp.src("www/app/**/*.js")
		.pipe(cached("eslint:web"))
		.pipe(eslint(eslintOpts))
		.pipe(eslint.format());
});
