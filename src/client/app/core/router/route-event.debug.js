'use strict';

/**
 * Logs routing events for debug purposes.
 */
/* @ngInject */
module.exports = function($rootScope, LoggerFactory) {
	var logger = LoggerFactory.getLogger('route-event.debug.js');
	// logger.enabled.DEBUG = true;

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		logger.debug('$stateChangeStart to ' + toState.to +
			' - fired when the transition begins. toState,toParams : \n', toState, toParams);
	});
	$rootScope.$on('$stateChangeError',
		function (event, toState, toParams, fromState, fromParams, error) {
			logger.debug('$stateChangeError - fired when an error occurs during transition.', arguments);
		});
	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		logger.debug('$stateChangeSuccess to ' + toState.name +
			'- fired o' +
			'nce the state transition is complete.');
	});
	$rootScope.$on('$viewContentLoading', function (event, viewConfig) {
		logger.debug('$viewContentLoading - view begins loading - dom not rendered', viewConfig);
	});
	// $rootScope.$on('$viewContentLoaded',function(event){
	//   // runs on individual scopes, so putting it in "run" doesn't work.
	//   logger.debug('$viewContentLoaded - fired after dom rendered',event);
	// 	});
	$rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
		logger.debug('$stateNotFound ' + unfoundState.to +
			' - fired when a state cannot be found by its name.', unfoundState, fromState, fromParams);
	});
}
