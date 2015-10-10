"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var less = require("gulp-less");
var rename = require("gulp-rename");
var LessPluginAutoPrefix = require("less-plugin-autoprefix");
var lessPluginGlob = require("less-plugin-glob");

gulp.task("less", ["less:app"]);

gulp.task("less:app", function() {
	return gulp.src("./www/app/ionic.app.less")
		.pipe(less({
			plugins : [
				new LessPluginAutoPrefix({ browsers : ["last 2 versions"] }),
				lessPluginGlob
			],
			compress : true
		}))
		.pipe(rename("ionic.app.min.css"))
		.pipe(gulp.dest("./www/dist/"));
});

gulp.task("watch:less", function() {
	return gulp.src("./www/app/ionic.app.less")
		.pipe(less({
			plugins : [
				new LessPluginAutoPrefix({ browsers : ["last 2 versions"] }),
				lessPluginGlob
			],
			compress : false
		}))
		.on("error", function(err) {
			gutil.log(gutil.colors.red(err));
			/* eslint no-invalid-this: 0 */
			this.emit("end");
		})
		.pipe(rename("ionic.app.min.css"))
		.pipe(gulp.dest("./www/dist/"));
});
