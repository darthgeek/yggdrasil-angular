'use strict';

/**
 * Mock logger for unit tests.
 * @return {object} logger factory
 * @constructor
 */
/* @ngInject */
function MockLoggerFactory() {
	var logger = {
		trace: function() {},
		debug: function() {},
		info: function() {},
		success: function() {},
		warn: function() {},
		error: function() {},
		fatal: function() {}
	};
	sinon.stub(logger, 'trace');
	sinon.stub(logger, 'debug');
	sinon.stub(logger, 'info');
	sinon.stub(logger, 'success');
	sinon.stub(logger, 'warn');
	sinon.stub(logger, 'error');
	sinon.stub(logger, 'fatal');

	var service = {
		getLogger: function () {
			return logger;
		}
	};

	return service;
}

module.exports = MockLoggerFactory;
