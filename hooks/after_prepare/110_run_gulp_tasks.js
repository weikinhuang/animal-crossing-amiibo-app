#!/usr/bin/env node

// Run gulp tasks before build

const childProcess = require("child_process");
const path = require("path");
const tasks = require("../../package.json").cordovaPreBuildGulpTasks || [];

childProcess.spawn(
	process.execPath,
	[
		path.join(require.resolve("gulp"), "..", "bin", "gulp")
	].concat(tasks),
	{
		cwd : process.cwd(),
		stdio : "inherit"
	}
);
