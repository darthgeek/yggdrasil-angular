'use strict';

/* @ngInject */
module.exports = function (LoggerFactory, config, $state, $http, $q) {
	var logger = LoggerFactory.getLogger('session.service.js');
	// logger.enabled.DEBUG = true;
	logger.info('SessionService initializing');

	var vm = this;

	var user;

	// init(config.apiUrl + '/session');

	return {
		resolve: resolve,
		create: create,
		destroy: destroy,
		getUser: getUser,
		isAuthenticated: isAuthenticated
	};

	////////////////////
	/**
	 * Initializes the session user object to the user or null if not authenticated
	 * and then transitions to the appropriate initial application state.
	 */
	function resolve(opts) {
		logger.debug('resolving initial authorization');
		var deferred = $q.defer();
		if (vm.user !== undefined) {
			deferred.resolve(vm.user);
		} else {
			$http.get(config.apiUrl + '/session')
				.then(function successCallback(response) {
					vm.user = vm.user = response.data;
					logger.debug('User authenticated', response);
					if (opts.authorizedState) {
						$state.go(opts.authorizedState);
					}
					deferred.resolve(vm.user);
				}, function errorCallback(response) {
					vm.user = vm.user = null;
					if (response.status === 401) {
						logger.debug('User not authenticated', response);
					} else {
						logger.error('Error retrieving current session from server', response, 'Login Error');
					}
					if (opts.unauthorizedState) {
						$state.go(opts.unauthorizedState);
					}
					deferred.resolve(vm.user);
				});
		}
		return deferred.promise;
	}

	/**
	 * Creates a new session.
	 * @param user identity and authorization information
	 */
	function create(user) {
		logger.debug('user session created', user);
		vm.user = user;
	}

	/**
	 * Destroys and invalidates the current session.
	 */
	function destroy() {
		vm.user = null;
	}

	/**
	 * Retrieves the current user details.
	 */
	function getUser() {
		return vm.user;
	}

	/**
	 * Returns true if the user is currently authenticated with the API.
	 */
	function isAuthenticated() {
		return !!vm.user;
	}
};
