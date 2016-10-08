'use strict';

module.exports = angular.module('core.logger', [])
	.factory('LoggerFactory', require('logger.factory.js'));
