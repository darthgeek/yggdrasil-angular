'use strict';

var gulp = require('gulp');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var log = require('app-root-path').require('gulpfile.js/lib/log');
var args = require('yargs').argv;
var Karma = require('karma').Server;

/**
 * Run specs once and exit.
 * --start-server starts up node server for midway tests
 * @return {Stream}
 */
gulp.task('test', ['vet'], function (done) {
	startTests(true /*singleRun*/, done);
});

/**
 * Run specs continuously.
 * --start-server starts up node server for midway tests
 * @return {Stream}
 */
gulp.task('test-watch', ['vet'], function (done) {
	startTests(false /*singleRun*/, done);
});

/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
	new Karma({
		configFile: gulpConfig.dir.root + 'karma.conf.js',
		singleRun: !!singleRun
	}, karmaCompleted).start();

	function karmaCompleted(karmaResult) {
		log('Karma completed');
		if (karmaResult === 1) {
			done('karma: tests failed with code ' + karmaResult);
		} else {
			done();
		}
	}
}
