'use strict';

var gulp = require('gulp');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});

var env = {
	NODE_PORT: gulpConfig.apiPort
};
if (args.verbose) {
	env.DEBUG = 'express:*';
}

gulp.task('serve-api', ['vet'], function () {
	$.express.run([gulpConfig.dir.server + 'server.js'], { env: env });

	gulp.watch([gulpConfig.dir.server + '/**/*.js'], ['vet']);
	gulp.watch([gulpConfig.dir.server + '**/*'], [$.express.notify]);
	gulp.watch([gulpConfig.dir.server + 'server.js'], [$.express.run]);
});
