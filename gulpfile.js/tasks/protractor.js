'use strict';

var gulp = require('gulp');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var log = require('app-root-path').require('gulpfile.js/lib/log');
var $ = require('gulp-load-plugins')({lazy: true});
var _ = require('lodash');
var spawn = require('child_process').spawnSync;
var args = require('yargs').argv;

/**
 * Runs protractor end-to-end tests.  Server must be running; either gulp serve-build or gulp serve-dev.
 * Use any combination of the following options:
 *   --chrome   Run tests with Chrome
 *   --firefox  Run tests with Firefox
 *   --safari   Run tests with Safari
 * or use --all-browsers to run with all three.
 */
gulp.task('protractor', function (cb) {
	var cmd = 'protractor';
	var args = ['protractor.conf.js'];
	if (args.chrome) {
		args.unshift('--chrome');
	}
	if (args.firefox) {
		args.unshift('--firefox');
	}
	if (args.safari) {
		args.unshift('--safari');
	}
	if (args.allBrowsers) {
		args.unshift('--all');
	}
	log('Running protractor end-to-end tests: ' + cmd);
	log('-----------------------------------------------------------');
	spawn(cmd, args, {
		cwd: gulpConfig.dir.root,
		stdio: 'inherit',
		env: _.assign(process.env, {
			FORCE_COLOR: true
		})
	});
	log('-----------------------------------------------------------');
});

