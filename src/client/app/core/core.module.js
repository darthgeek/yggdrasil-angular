'use strict';

require('angular');
require('angular-ui-router');

require('app/core/logger/logger.module.js');
require('app/core/router/router.module.js');
require('app/core/security/security.module.js');
require('toastr/toastr.scss');

module.exports = angular.module('app.core',
	[
		'core.logger',
		'core.router',
		'core.security'
	])
	.run(require('core.route.js'))
	.constant('toastr', require('toastr'))
	.constant('moment', require('moment'))
	.constant('_', window._)
	.constant('$', window.$);


require('core.config.js');
