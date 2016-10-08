'use strict';

require('angular-ui-router');
require('app/core/logger/logger.module.js');

module.exports = angular.module('core.router',
	[
		'ui.router',
		'core.logger'
	])
	.provider('routerHelper', require('router-helper.provider.js'))
	.run(require('route-event.debug.js'));
