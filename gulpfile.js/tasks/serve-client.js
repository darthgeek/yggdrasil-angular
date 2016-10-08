'use strict';

var gulp = require('gulp');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var stream = require('webpack-stream');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Compiles the webpack module, launches a browser sync session and watches for source code changes.
 * @return {Stream}
 */
gulp.task('serve-dev', ['vet'], function () {
	return serve('dev');
});

/**
 * Compiles the webpack module, launches a browser sync session and watches for source code changes.
 * @return {Stream}
 */
gulp.task('serve-prod', ['vet'], function () {
	return serve('prod');
});

function serve(env) {
	return gulp.src(gulpConfig.js)
		.pipe($.if(args.verbose, $.print()))
		.pipe(stream(require('app-root-path').require('webpack.config.js')({env: env, serve: true})))
		.pipe(gulp.dest(gulpConfig.dir.build));
}
