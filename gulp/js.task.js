"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var browserify = require("browserify");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var isDev = process.env.NODE_ENV !== "production";
var isWatching = false;
var uglifyOptions = {
	compress : isDev ? false : {
		/* eslint camelcase:0 */
		drop_console : true
	},
	beautify : isDev,
	sourceMap : false
};

gulp.task("js", ["browserify:index"]);
gulp.task("watch:js", ["watch:browserify:index"]);

gulp.task("browserify:index", function() {
	if (isWatching) {
		return;
	}
	browserify({
		entries : "./www/app/index.js",
		debug : false
	})
		.bundle()
		.pipe(source("./www/app/index.js"))
		.pipe(buffer())
		.pipe(isDev ? gutil.noop() : uglify(uglifyOptions))
		.pipe(rename("index.min.js"))
		.pipe(gulp.dest("./www/dist/"));
});

gulp.task("watch:browserify:index", function() {
	var bundler,
		watchify;

	if (isWatching) {
		return;
	}
	watchify = require("watchify");
	bundler = watchify(browserify({
		entries : "./www/app/index.js",
		debug : false
	}, watchify.args));

	function bundle() {
		isWatching = true;
		return bundler.bundle()
			.on("error", gutil.log.bind(gutil, "Browserify Error"))
			.pipe(source("index.js"))
			.pipe(buffer())
			.pipe(rename("index.min.js"))
			.pipe(gulp.dest("./www/dist/"));
	}

	bundler.on("update", bundle); // on any dep update, runs the bundler
	bundler.on("log", gutil.log.bind(gutil, "Updated  'watch:browserify:index'")); // output build logs to terminal
	return bundle();
});
