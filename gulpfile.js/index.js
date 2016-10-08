'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('tasks', $.taskListing.withFilters(/[:]/));
gulp.task('default', ['tasks']);

requireDir('./tasks', {
	recurse: true
});
