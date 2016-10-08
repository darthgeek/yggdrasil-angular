'use strict';

require('login.html');

/* @ngInject */
module.exports = function ($scope, $state, LoggerFactory, AuthService, SessionService, SECU_EVENTS) {
	var logger = LoggerFactory.getLogger('login.controller.js');
	// logger.enabled.DEBUG = true;
	logger.info('LoginController initializing');

	$scope.iconUrl = require('images/yggdrasil-xs.png');

	$scope.credentials = {
		username: '',
		password: ''
	};

	// Event Handlers
	$scope.$on(SECU_EVENTS.loginSuccess, function (event) {
		if (SessionService.getUser()) {
			$state.go('main');
			logger.success('Welcome ' + SessionService.getUser().handle + '!', SessionService.getUser(), 'Login Success');
		} else {
			logger.error('Session not registered on client side', null, 'Login Failure');
		}
	});

	$scope.$on(SECU_EVENTS.loginFailed, function (event, err) {
		if (!err.data) {
			logger.error('Connection refused by server', err, 'Login Failure');
		} else {
			logger.error(err.data.description, err.data, 'Login Failure');
		}
	});

	return {onLogin: onLogin};

	/////////////////

	/**
	 * Handles submission of the login form.
	 * @param username username to authenticate as
	 * @param password password for user
	 */
	function onLogin(username, password) {
		logger.debug('logging in as ' + username);
		AuthService.login(username, password);
	}
};
