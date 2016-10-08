/* global jasmine:true */
'use strict';

var gulpConfig = require('app-root-path').require('gulp.config.js')();
// var SpecReporter = require('jasmine-spec-reporter');
// var ScreenShotReporter = require('protractor-jasmine2-screenshot-reporter');
var args = require('yargs').argv;
var promise = require('q');
var chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));

var capabilities = [];
if (args.safari) {  // Safari's being problematic...
	capabilities.push({'browserName': 'safari'});
}
if (args.all || args.firefox) {
	capabilities.push({'browserName': 'firefox'});
}
if (args.all || capabilities.length === 0 || args.chrome) {
	capabilities.push({'browserName': 'chrome'});
}

process.env.PROSHOT_DIR = gulpConfig.dir.report + 'e2e-screenshots';
process.env.multi = 'spec=- mocha-proshot=-'; // See 'mocha-multi' for configuration details

exports.config = {
	allScriptsTimeout: 11000,
	specs: gulpConfig.e2eSpecs,
	multiCapabilities: capabilities,
	baseUrl: 'http://localhost:' + gulpConfig.serverPort + '/',
	framework: 'mocha',
	mochaOpts: {
		reporter: 'mocha-multi',
		timeout: 4000
	},
	beforeLaunch: function () {
	},
	onPrepare: function () {
		global.expect = chai.expect;
	},
	afterLaunch: function (exitCode) {
	}
};
