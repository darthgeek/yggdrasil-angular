/* jshint -W117,-W030 */
'use strict';

require('angular');
var toastr = require('toastr');
var moment = require('moment');

// TODO: add asserts for fake toastr

describe('app/core/logger', function () {
	describe('logger.factory.js', function () {
		var LoggerFactory = require('logger.factory.js');
		var logger;
		var config = {
			logEnabled: {
				TRACE: false,
				DEBUG: false
			}
		};

		beforeEach(function () {
			sinon.stub(console, 'log');
			sinon.stub(console, 'debug');
			sinon.stub(console, 'info');
			sinon.stub(console, 'warn');
			sinon.stub(console, 'error');
		});

		afterEach(function () {
			console.log.restore();
			console.debug.restore();
			console.info.restore();
			console.warn.restore();
			console.error.restore();
		});

		it('creates a logger with trace and debug disabled by default', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			expect(logger).not.null;
			expect(logger.enabled).include({'TRACE': false});
			expect(logger.enabled).include({'DEBUG': false});
			expect(logger.enabled).include({'INFO': true});
			expect(logger.enabled).include({'SUCCESS': true});
		});

		it('logs a fatal message', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.fatal('test message');
			expect(console.error.getCall(0).args[0]).contains('FATAL');
			expect(console.error.getCall(0).args[0]).contains('test message');
		});

		it('logs a error message', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.error('test message');
			expect(console.error.getCall(0).args[0]).contains('ERROR');
			expect(console.error.getCall(0).args[0]).contains('test message');
		});

		it('logs a warning message', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.warn('test message');
			expect(console.warn.getCall(0).args[0]).contains('WARN');
			expect(console.warn.getCall(0).args[0]).contains('test message');
		});

		it('logs an info message by default', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.info('test message');
			expect(console.info.getCall(0).args[0]).contains('INFO');
			expect(console.info.getCall(0).args[0]).contains('test message');
		});

		it('does not log an info message when disabled', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.enabled.INFO = false;
			logger.info('test message');
			expect(console.info).not.called;
		});

		it('logs a success message by default', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.success('test message');
			expect(console.log.getCall(0).args[0]).contains('SUCCESS');
			expect(console.log.getCall(0).args[0]).contains('test message');
		});

		it('does not log a success message when disabled', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.enabled.SUCCESS = false;
			logger.success('test message');
			expect(console.log).not.called;
		});

		it('does not log a debug message by default', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.debug('test message');
			expect(console.debug).not.called;
		});

		it('logs a debug message when enabled', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.enabled.DEBUG = true;
			logger.debug('test message');
			expect(console.debug.getCall(0).args[0]).contains('DEBUG');
			expect(console.debug.getCall(0).args[0]).contains('test message');
		});

		it('does not log a trace message by default', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.trace('test message');
			expect(console.debug).not.called;
		});

		it('logs a success message when enabled', function () {
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.enabled.TRACE = true;
			logger.trace('test message');
			expect(console.debug.getCall(0).args[0]).contains('TRACE');
			expect(console.debug.getCall(0).args[0]).contains('test message');
		});

		it('logs debug messages when level is enabled by default', function () {
			var config = {
				logEnabled: {
					DEBUG: true
				}
			};
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.debug('test message');
			expect(console.debug.getCall(0).args[0]).contains('DEBUG');
			expect(console.debug.getCall(0).args[0]).contains('test message');
		});

		it('does not log info messages when level is disabled by default', function () {
			var config = {
				logEnabled: {
					INFO: false
				}
			};
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.info('test message');
			expect(console.info).not.called;
		});

		it('does not log success messages when level is disabled by default', function () {
			var config = {
				logEnabled: {
					SUCCESS: false
				}
			};
			logger = new LoggerFactory(toastr, moment, config).getLogger('test');
			logger.success('test message');
			expect(console.log).not.called;
		});
	});
});
