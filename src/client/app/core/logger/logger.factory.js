'use strict';

var _ = require('lodash');

/**
 * Simple application logging framework.
 * @param toastr toastr for client side notifications
 * @return {object} logger factory
 * @constructor
 */
/* @ngInject */
function LoggerFactory(toastr, moment, config) {
	var defaultEnabled = {
		TRACE: angular.isDefined(config.logEnabled.TRACE) ? config.logEnabled.TRACE : false,
		DEBUG: angular.isDefined(config.logEnabled.DEBUG) ? config.logEnabled.DEBUG : false,
		INFO: angular.isDefined(config.logEnabled.INFO) ? config.logEnabled.INFO : true,
		SUCCESS: angular.isDefined(config.logEnabled.SUCCESS) ? config.logEnabled.SUCCESS : true
	};

	var Level = {
		TRACE: {
			name: ' TRACE ',
			color: '#666',
			backgroundColor: '#ccc'
		},
		DEBUG: {
			name: ' DEBUG ',
			color: '#000',
			backgroundColor: '#6ff'
		},
		INFO: {
			name: '  INFO ',
			color: '#000',
			backgroundColor: '#99f'
		},
		SUCCESS: {
			name: 'SUCCESS',
			color: '#000',
			backgroundColor: '#9f9'
		},
		WARN: {
			name: '  WARN ',
			color: '#000',
			backgroundColor: '#ff6'
		},
		ERROR: {
			name: ' ERROR ',
			color: '#000',
			backgroundColor: '#f99'
		},
		FATAL: {
			name: ' FATAL ',
			color: '#fff',
			backgroundColor: '#f00'
		}
	};

	function Logger(name) {
		this.name = name;
		this.enabled = Object.create(defaultEnabled);
	}

	Logger.prototype.trace = function (message, data) {
		if (this.enabled.TRACE) {
			_log(console.debug, this.name, Level.TRACE, message, data);
		}
	};
	Logger.prototype.debug = function (message, data) {
		if (this.enabled.DEBUG) {
			_log(console.debug, this.name, Level.DEBUG, message, data);
		}
	};
	Logger.prototype.info = function (message, data) {
		if (this.enabled.INFO) {
			_log(console.info, this.name, Level.INFO, message, data);
		}
	};
	Logger.prototype.success = function (message, data, title) {
		if (this.enabled.SUCCESS) {
			_log(console.log, this.name, Level.SUCCESS, message, data);
			toastr.success(message, title || 'Success');
		}
	};
	Logger.prototype.warn = function (message, data, title) {
		_log(console.warn, this.name, Level.WARN, message, data);
		toastr.warning(message, title || 'Warning');
	};
	Logger.prototype.error = function (message, data, title) {
		_log(console.error, this.name, Level.ERROR, message, data);
		toastr.error(message, title || 'Error');
	};
	Logger.prototype.fatal = function (message, data, title) {
		_log(console.error, this.name, Level.FATAL, message, data);
		toastr.error(message, title || 'Fatal Error');
	};


	var service = {};

	service.getLogger = function (name) {
		return new Logger(name);
	};

	return service;

	//////////////////

	// TODO - clean this up a little

	function _log(fn, loggerName, level, message, data) {
		var format =
			'<span style="color:#036;font-style:italic;">' +
			moment().format('HH:mm:ss.SSS') +
			'</span> ' +
			'<span style="font-weight:bold;color:' + level.color + ';background-color:' + level.backgroundColor + '">' +
			'|  ' + level.name + '  |' +
			'</span> ' + message +
			'\n<span style="color:#606;font-weight:bold">:' + loggerName +
			'</span>';
		fn.apply(console, consoleLogArgs(format, data));
	}

	function consoleLogArgs() {
		var argArray = [];

		if (arguments.length) {
			var startTagRe = /<span\s+style=(['"])([^'"]*)\1\s*>/gi;
			var endTagRe = /<\/span>/gi;

			var reResultArray;
			argArray.push(arguments[0].replace(startTagRe, '%c').replace(endTagRe, '%c'));
			while (reResultArray = startTagRe.exec(arguments[0])) {
				argArray.push(reResultArray[2]);
				argArray.push('');
			}

			/*
			 * Pass through subsequent args since chrome dev tools does not (yet)
			 * support console.log styling of the following form:
			 * console.log('%cBlue!', 'color: blue;', '%cRed!', 'color: red;');
			 */
			for (var j = 1; j < arguments.length; j++) {
				argArray.push(arguments[j]);
			}
		}

		return argArray;
	}

}

module.exports = LoggerFactory;
