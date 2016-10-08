'use strict';

var gulp = require('gulp');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var stream = require('webpack-stream');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Compiles the webpack module for development.
 * @return {Stream}
 */
gulp.task('build-dev', ['clean', 'vet'], function () {
	return build('dev');
});

/**
 * Compiles the webpack module for production.
 * @return {Stream}
 */
gulp.task('build-prod', ['clean', 'vet'], function () {
	return build('prod');
});

function build(env) {
	return gulp.src(gulpConfig.js)
		.pipe($.if(args.verbose, $.print()))
		.pipe(stream(require('app-root-path').require('webpack.config.js')({env: env})))
		.pipe(gulp.dest(gulpConfig.dir.build));
}
