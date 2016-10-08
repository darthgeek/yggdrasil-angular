'use strict';

require('jquery');
require('bootstrap/dist/js/bootstrap.js');
require('angular');

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');
require('sass/styles.scss');

require('app/core/core.module.js');
require('app/ui/ui.module.js');
require('app/game/game.module.js');

module.exports = angular.module('app',
	[
		'app.core',
		'app.ui',
		'app.game'
	]);
