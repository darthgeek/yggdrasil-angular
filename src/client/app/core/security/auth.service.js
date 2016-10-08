'use strict';

/* @ngInject */
module.exports = function($http, $rootScope, LoggerFactory, SessionService, SECU_EVENTS) {
	var logger = LoggerFactory.getLogger('auth.service.js');
	logger.info('AuthService initializing');

	return {
		login: login,
		logout: logout
	};

	////////////////////

	/**
	 * Submits a login request to the API .
	 * @param username username
	 * @param password password
	 * @return {JQueryPromise<any>}
	 */
	function login(username, password) {
		return $http
			.post('/api/login', {username: username, password: password})
			.then(function (res) {
				SessionService.create(res.data.user);
				$rootScope.$broadcast(SECU_EVENTS.loginSuccess, res.data.user);
			}, function (err) {
				$rootScope.$broadcast(SECU_EVENTS.loginFailed, err);
			});

	}

	/**
	 * Calls the API to log the user out gracefully.
	 */
	function logout() {
		return $http
			.post('/api/logout')
			.then(function (res) {
				SessionService.destroy();
				$rootScope.$broadcast(SECU_EVENTS.logoutSuccess);
			});
	}
};
