'use strict';

/**
 * Simple wrapper for del that logs the path being cleaned.
 */
var del = require('del');
var log = require('./log');
var $ = require('gulp-load-plugins')({lazy: true});

module.exports = function (path, cb) {
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path, {force: true}).then(function() {
		if (typeof cb === 'function') {
			cb();
		}
	}).catch(function(reason) {
		log($.util.colors.red(reason));
	});
};
