"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var minifyCss = require("gulp-minify-css");
var sass = require("gulp-sass");

gulp.task("sass", ["sass:app"]);

gulp.task("sass:app", function(done) {
	gulp.src("./scss/ionic.app.scss")
		.pipe(sass({
			errLogToConsole : true
		}))
		.pipe(gulp.dest("./www/css/"))
		.pipe(minifyCss({
			keepSpecialComments : 0
		}))
		.pipe(rename("ionic.framework.min.css"))
		.pipe(gulp.dest("./www/dist/"))
		.on("end", done);
});
