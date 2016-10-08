/* jshint -W117,-W030 */
'use strict';

var ShellController = require('shell.controller.js');
var MockLoggerFactory = require('test/mock-logger.factory.js');

require('angular-mocks');
require('bardjs');

describe('app/ui/shell', function () {
	describe('shell.controller.js', function () {
		var ctrl;
		var mockState = {
			go: function(state) {
			}
		};
		var mockScope;
		var mockAuth = {
			login: function () {
			},
			logout: function () {
			}
		};
		var secu_events = {
			loginSuccess: 'security:login-success',
			loginFailed: 'security:login-failed',
			logoutSuccess: 'security:logout-success'
		};

		beforeEach(function () {
			bard.inject('$rootScope');
			mockScope = $rootScope.$new();

			ctrl = new ShellController(mockScope, mockState, new MockLoggerFactory(), secu_events);
			sinon.spy(mockScope, '$on');
			sinon.spy(mockAuth, 'logout');
			sinon.spy(mockState, 'go');
		});

		afterEach(function() {
			mockScope.$on.restore();
			mockAuth.logout.restore();
			mockState.go.restore();
		});

		it('transitions to user-login state when logoutSuccess event received', function () {
			$rootScope.$broadcast(secu_events.logoutSuccess)
			expect(mockState.go).called;
			expect(mockState.go.getCall(0).args[0]).equal('user-login');
		});
	});
});
