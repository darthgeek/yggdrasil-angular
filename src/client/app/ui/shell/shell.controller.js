'use strict';

/* @ngInject */
function ShellController($scope, $state, LoggerFactory, SECU_EVENTS) {
	var logger = LoggerFactory.getLogger('shell.controller.js');
	logger.info('ShellController initializing');

	$scope.$on(SECU_EVENTS.logoutSuccess, function (event) {
		console.log('logout success');
		$state.go('user-login');
		logger.success('You have been logged out of the system.', null, 'Logout Success');
	});

	return {};
}

module.exports = ShellController;
