/* jshint -W117,-W030 */
'use strict';

/* jshint -W117,-W030 */
'use strict';

var GameController = require('game.controller.js');
var MockLoggerFactory = require('test/mock-logger.factory.js');

require('angular-mocks');
require('bardjs');

describe('app/game', function () {
	describe('game.controller.js', function () {
		var ctrl;
		var mockScope;
		var ui_events = {
			toggleSystemMenu: 'test:toggle-system-menu'
		}

		beforeEach(function () {
			bard.inject('$rootScope');
			mockScope = $rootScope.$new();

			ctrl = new GameController($rootScope, mockScope, new MockLoggerFactory(), ui_events);
			// sinon.spy(mockScope, '$on');
		});

		afterEach(function () {
			// mockScope.$on.restore();
		});

		it('has a unit test', function() {
			throw Error('not implemented');
		})
	});
});
