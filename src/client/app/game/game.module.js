'use strict';

module.exports = angular.module('app.game',
	[
		'app.core'
	])
	.directive('yggGameCanvas', require('game-canvas.directive.js'))
	.controller('GameController', require('game.controller.js'));
