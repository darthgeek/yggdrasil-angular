'use strict';

module.exports = angular.module('app.ui.system-menu',
	[
		'app.core'
	])
	.controller('SystemMenuController', require('system-menu.controller.js'));
