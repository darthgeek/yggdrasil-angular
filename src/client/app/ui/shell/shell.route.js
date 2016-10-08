'use strict';

/* @ngInject */
module.exports = function configureRouter(routerHelper, LoggerFactory) {
	var logger = LoggerFactory.getLogger('shell.route.js');
	logger.debug('initializing application shell route');

	routerHelper.configureStates(getStates());

	function getStates() {
		return [
			{
				state: 'main',
				config: {
					url: '/',
					views: {
						'game-canvas': {
							templateUrl: 'app/game/game-canvas.html',
							controller: 'GameController as vm'
						},
						'system-menu': {
							templateUrl: 'app/ui/system-menu/system-menu.html'
						}
					},
					title: 'Game Window',
					resolve: {
						currentUser: function resolveAuthentication(SessionService) {
							return SessionService.resolve({
								unauthorizedState: 'user-login'
							});
						}
					}
				}
			},
		];
	}
};
