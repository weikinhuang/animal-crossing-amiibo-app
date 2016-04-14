"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var sass = require("gulp-sass");

gulp.task("sass", ["sass:app"]);

gulp.task("sass:app", function(done) {
	gulp.src("./scss/ionic.app.scss")
		.pipe(sass({
			errLogToConsole : true
		}))
		.pipe(gulp.dest("./www/dist/"))
		.pipe(cleanCss({
			keepSpecialComments : 0
		}))
		.pipe(rename("ionic.framework.min.css"))
		.pipe(gulp.dest("./www/dist/"))
		.on("end", done);
});
