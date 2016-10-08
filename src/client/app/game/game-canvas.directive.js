'use strict';

module.exports = function ($compile, LoggerFactory) {
	var logger = LoggerFactory.getLogger('game-canvas.directive.js');
	logger.debug('Initializing game canvas directive');

	var directive = {
		restrict: 'E',
		link: function(scope, element, attrs) {
			var html = '<div id="gameCanvas"></div>';
			var e = $compile(html)(scope);
			element.replaceWith(e)
		}
	};

	return directive;
};
