'use strict';

require('system-menu.html');

/* @ngInject */
function SystemMenuController($scope, LoggerFactory, UI_EVENTS, AuthService) {
	var logger = LoggerFactory.getLogger('system-menu.controller.js');
	logger.info('SystemMenuController initializing');

	$scope.systemMenuVisible = false;

	$scope.$on(UI_EVENTS.toggleSystemMenu, function() {
		$scope.systemMenuVisible = !$scope.systemMenuVisible;
	});

	return {
		logout: logout
	};

	//////////////

	/**
	 * Handles a logout request.
	 */
	function logout() {
		AuthService.logout();
	}
}

module.exports = SystemMenuController;
