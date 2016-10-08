'use strict';

var gulp = require('gulp');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var log = require('app-root-path').require('gulpfile.js/lib/log');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Vets the code and creates coverage report.
 * @return {Stream}
 */
gulp.task('vet', function () {
	log('Analyzing source with JSHint and JSCS');

	return gulp
		.src(gulpConfig.jsVet)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jshint())
		.pipe($.jscs())
		.pipe($.jscsStylish.combineWithHintResults())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail'));
});
