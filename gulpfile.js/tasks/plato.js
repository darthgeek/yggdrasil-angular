'use strict';

var gulp = require('gulp');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var log = require('app-root-path').require('gulpfile.js/lib/log');
var plato = require('plato');

/**
 * Creates a visualizer report.
 */
gulp.task('plato', ['vet'], function (done) {
	var files = gulpConfig.jsPlato;
	var outputDir = gulpConfig.dir.report + 'plato';

	plato.inspect(files, outputDir, gulpConfig.platoOptions, platoCompleted);

	function platoCompleted(report) {
		var overview = plato.getOverviewReport(report);
		log('Plato Inspection Summary Report');
		log(outputDir + '/index.html');
		log('--------------------------------------');
		log('  Total:          jshint = ' + overview.summary.total.jshint);
		log('                    sloc = ' + overview.summary.total.sloc);
		log('         maintainability = ' + overview.summary.total.maintainability);
		log('--------------------------------------');
		log('  Average:        jshint = ' + overview.summary.average.jshint);
		log('                    sloc = ' + overview.summary.average.sloc);
		log('         maintainability = ' + overview.summary.average.maintainability);
		log('--------------------------------------');
		if (typeof(done) === 'function') {
			done();
		}
	}
});
