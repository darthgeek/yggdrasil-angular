'use strict';

require('game-canvas.html');

/* @ngInject */
function GameController($rootScope, $scope, LoggerFactory, UI_EVENTS) {
	var logger = LoggerFactory.getLogger('game.controller.js');
	logger.info('GameController initializing');

	return {
		toggleSystemMenu: toggleSystemMenu
	};

	////////////////

	/**
	 * Broadcasts a toggle system menu event.
	 */
	function toggleSystemMenu() {
		$rootScope.$broadcast(UI_EVENTS.toggleSystemMenu);
	}
}

module.exports = GameController;
