'use strict';

require('app/core/404.html');

/* @ngInject */
module.exports = function configureRouter(routerHelper, LoggerFactory) {
	var logger = LoggerFactory.getLogger('core.route.js');
	logger.debug('initializing core route');

	routerHelper.configureStates(getStates(), function ($injector, $location) {
		var state = $injector.get('$state');
		state.go('404');
		return $location.path();
	});

	function getStates() {
		return [
			{
				state: '404',
				config: {
					templateUrl: 'app/core/404.html',
					title: 'Page Not Found',
					resolve: {
						currentUser: function resolveAuthentication(SessionService) {
							return SessionService.resolve({
								unauthorizedState: 'user-login'
							});
						}
					}
				}
			}
		];
	}

};
