/* jshint -W117,-W030 */
'use strict';

var SystemMenuController = require('system-menu.controller.js');
var MockLoggerFactory = require('test/mock-logger.factory.js');

require('angular-mocks');
require('bardjs');

describe('app/ui/system-menu', function () {
	describe('system-menu.controller.js', function () {
		var ctrl;
		var mockScope;
		var mockAuthService = {
			logout: function() { }
		};
		var ui_events = {
			toggleSystemMenu: 'test:toggle-system-menu'
		};

		beforeEach(function () {
			bard.inject('$rootScope');
			mockScope = $rootScope.$new();

			ctrl = new SystemMenuController(mockScope, new MockLoggerFactory(), ui_events, mockAuthService);
			sinon.stub(mockAuthService, 'logout');
		});

		afterEach(function() {
			mockAuthService.logout.restore();
		});

		it('logs out with the authentication service', function () {
			ctrl.logout();
			expect(mockAuthService.logout).called;
		});

		it('toggles system menu visibility on and off' , function () {
			$rootScope.$broadcast(ui_events.toggleSystemMenu);
			$rootScope.$digest();
			expect(mockScope.systemMenuVisible).ok;
			$rootScope.$broadcast(ui_events.toggleSystemMenu);
			$rootScope.$digest();
			expect(mockScope.systemMenuVisible).not.ok;
		});
	});
});
