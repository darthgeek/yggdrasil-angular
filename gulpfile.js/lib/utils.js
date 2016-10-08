'use strict';

var gulp = require('gulp');
var path = require('path');
var _ = require('lodash');

/**
 * Show OS level notification using node-notifier
 */
function notify(options) {
	var notifier = require('node-notifier');
	var notifyOptions = {
		sound: 'Bottle',
		contentImage: path.join(__dirname, 'gulp.png'),
		icon: path.join(__dirname, 'gulp.png')
	};
	_.assign(notifyOptions, options);
	notifier.notify(notifyOptions);
}

module.exports = {
	notify: notify
};
