'use strict';

/**
 * Logs UI events for debug purposes.
 */
/* @ngInject */
module.exports = function($rootScope, UI_EVENTS, LoggerFactory) {
	var logger = LoggerFactory.getLogger('ui-event.debug.js');
	// logger.enabled.DEBUG = true;

	$rootScope.$on(UI_EVENTS.toggleSystemMenu, function (event, user) {
		logger.debug('toggle system menu', user);
	});
};
