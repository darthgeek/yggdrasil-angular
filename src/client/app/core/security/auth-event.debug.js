'use strict';

/**
 * Logs security and authorization events for debug purposes.
 */
/* @ngInject */
module.exports = function($rootScope, SECU_EVENTS, LoggerFactory) {
	var logger = LoggerFactory.getLogger('auth-event.debug.js');
	// logger.enabled.DEBUG = true;

	$rootScope.$on(SECU_EVENTS.loginSuccess, function (event, user) {
		logger.debug('login success', user);
	});
	$rootScope.$on(SECU_EVENTS.loginFailed, function (event, err) {
		logger.debug('login failed', err);
	});
	$rootScope.$on(SECU_EVENTS.logoutSuccess, function (event) {
		logger.debug('logout success');
	});
	$rootScope.$on(SECU_EVENTS.sessionTimeout, function (event) {
		logger.debug('session timed out');
	});
	$rootScope.$on(SECU_EVENTS.notAuthenticated, function (event) {
		logger.debug('user not authenticated');
	});
	$rootScope.$on(SECU_EVENTS.notAuthorized, function (event) {
		logger.debug('user not authorized');
	});
};
