'use strict';

/**
 * Helper function for registering UI route states.
 */
/* @ngInject */
function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
	/* jshint validthis:true */
	var config = {
		docTitle: undefined,
		resolveAlways: {}
	};

	if (!(window.history && window.history.pushState)) {
		window.location.hash = '/';
	}

	$locationProvider.html5Mode(true);

	this.configure = function (cfg) {
		angular.extend(config, cfg);
	};

	this.$get = RouterHelper;

	/* @ngInject */
	function RouterHelper($location, $rootScope, $state, LoggerFactory) {
		var logger = LoggerFactory.getLogger('router-helper.provider.js');
		var handlingStateChangeError = false;
		var hasOtherwise = false;
		var stateCounts = {
			errors: 0,
			changes: 0
		};

		var service = {
			configureStates: configureStates,
			getStates: getStates,
			stateCounts: stateCounts
		};

		init();

		return service;

		///////////////

		function configureStates(states, otherwise) {
			states.forEach(function (state) {
				state.config.resolve =
					angular.extend(state.config.resolve || {}, config.resolveAlways);
				$stateProvider.state(state.state, state.config);
			});
			if (otherwise && !hasOtherwise) {
				hasOtherwise = true;
				$urlRouterProvider.otherwise(otherwise);
			}
		}

		function handleRoutingErrors() {
			// Route cancellation:
			// On routing error, go to the dashboard.
			// Provide an exit clause if it tries to do it twice.
			$rootScope.$on('$stateChangeError',
				function (event, toState, toParams, fromState, fromParams, error) { // jshint ignore:line
					if (handlingStateChangeError) {
						return;
					}
					stateCounts.errors++;
					handlingStateChangeError = true;
					var destination = (toState &&
						(toState.title || toState.name || toState.loadedTemplateUrl)) ||
						'unknown target';
					var msg = 'Error routing to ' + destination + '. ';
					if (!error.data && !error.status) {
						msg += error;
					} else {
						msg += (error.data || '') + '. <br/>' + (error.statusText || '') +
							': ' + (error.status || '');
					}
					logger.warn(msg, [toState]);
					$location.path('/');
				}
			);
		}

		function init() {
			handleRoutingErrors();
			updateDocTitle();
		}

		function getStates() {
			return $state.get();
		}

		function updateDocTitle() {
			$rootScope.$on('$stateChangeSuccess',
				function (event, toState, toParams, fromState, fromParams) {
					stateCounts.changes++;
					handlingStateChangeError = false;
					var title = config.docTitle + ' ' + (toState.title || '');
					$rootScope.title = title; // data bind to <title>
				}
			);
		}
	}
}

module.exports = routerHelperProvider;
