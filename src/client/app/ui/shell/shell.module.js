'use strict';

module.exports = angular.module('app.ui.shell',
	[
		'app.core'
	])
	.controller('ShellController', require('shell.controller.js'))
	.run(require('shell.route.js'))
	.run(require('ui-event.debug.js'));


require('shell.constants.js');
