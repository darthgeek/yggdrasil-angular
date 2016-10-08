'use strict';

angular.module('core.security')
	.constant('SECU_EVENTS', {
		loginSuccess: 'security:login-success',
		loginFailed: 'security:login-failed',
		logoutSuccess: 'security:logout-success',
		sessionTimeout: 'security:session-timeout',
		notAuthenticated: 'security:not-authenticated',
		notAuthorized: 'security:not-authorized'
	});
