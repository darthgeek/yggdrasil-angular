'use strict';

/**
 * Cleans all generated files.
 */
var gulp = require('gulp');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var clean = require('app-root-path').require('gulpfile.js/lib/clean');

gulp.task('clean', function (done) {
	var files = [].concat(
		gulpConfig.dir.build
	);
	clean(files, done);
});
