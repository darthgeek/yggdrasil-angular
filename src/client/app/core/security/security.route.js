'use strict';

/* @ngInject */
module.exports = function configureRouter(routerHelper, LoggerFactory) {
	var logger = LoggerFactory.getLogger('security.route.js');
	logger.debug('initializing security route');

	routerHelper.configureStates(getStates());

	function getStates() {
		return [
			{
				state: 'user-login',
				config: {
					url: '/login',
					templateUrl: 'app/core/security/login.html',
					title: 'Login',
					resolve: {
						currentUser: function resolveAuthentication(SessionService) {
							return SessionService.resolve({
								authorizedState: 'main'
							});
						}
					}
				}
			}
		];
	}
};

