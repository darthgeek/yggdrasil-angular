'use strict';

var gulpConfig = require('app-root-path').require('gulp.config.js')();
var args = require('yargs').argv;

module.exports = function (config) {
	var preprocessors = {};
	preprocessors[gulpConfig.dir.unit + 'all-tests.js'] = ['webpack'];

	var reporters = args.debug ? ['spec'] : ['notify', 'spec', 'coverage'];
	var browsers = args.debug ? ['Chrome'] : ['PhantomJS'];

	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: gulpConfig.dir.root,

		// frameworks to use
		// some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],

		// list of files / patterns to load in the browser
		files: [
			gulpConfig.dir.unit + 'all-tests.js'
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: preprocessors,

		// test results reporter to use
		// possible values: 'dots', 'progress', 'coverage'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: reporters,

		coverageReporter: {
			dir: gulpConfig.dir.report + 'coverage',
			reporters: [
				// reporters not supporting the `file` property
				{type: 'html', subdir: 'report-html'},
				{type: 'lcov', subdir: 'report-lcov'},
				{type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
			]
		},
		specReporter: {
			suppressPassed: false,
			showSpecTiming: true
		},

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR ||
		// config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		//        browsers: ['Chrome', 'ChromeCanary', 'FirefoxAurora', 'Safari', 'PhantomJS'],
		browsers: browsers,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		webpack: require('app-root-path').require('webpack.config.js')({env: 'test'}),

		webpackMiddleware: {
			noInfo: true
		}
	});
};
