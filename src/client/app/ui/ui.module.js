'use strict';

require('angular');

require('app/ui/shell/shell.module.js');
require('app/ui/system-menu/system-menu.module.js');

module.exports = angular.module('app.ui',
	[
		'app.ui.shell',
		'app.ui.system-menu'
	]);
