'use strict';

module.exports = angular.module('core.security',
	[])
	.run(require('security.route.js'))
	.controller('LoginController', require('login.controller.js'))
	.service('AuthService', require('auth.service.js'))
	.service('SessionService', require('session.service.js'))
	.run(require('auth-event.debug.js'));

require('security.constants.js');
