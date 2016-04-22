"use strict";

var gulp = require("gulp");
var glob = require("glob");
var os = require("os");
var path = require("path");

// we need to explicitly mention the path to nodejs in windows
if (os.platform() === "win32") {
	// make sure to use node.exe instead of some wrapped node binary for future processes
	process.env.PATH = path.dirname(process.execPath) + ";" + process.env.PATH;
}

glob.sync("*.task.js", { cwd : "gulp" }).forEach(function(filename) {
	if ((/\.dev\.task\.js$/).test(filename) && process.env.NODE_ENV === "production") {
		return;
	}
	// load up tasks from sub files
	require(path.join(__dirname, "gulp", filename));
});

gulp.task("default", [
	"dist"
]);

gulp.task("lint", ["eslint"]);

gulp.task("dist", [
	"js", "sass", "less"
]);

gulp.task("watch", [
	"dev"
]);
