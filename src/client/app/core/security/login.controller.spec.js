/* jshint -W117,-W030 */
'use strict';

var LoginController = require('login.controller.js');
var MockLoggerFactory = require('test/mock-logger.factory.js');

require('angular-mocks');
require('bardjs');

describe('app/core/security', function () {
	describe('login.controller.js', function () {
		var ctrl;
		var mockLogger;
		var mockState = {
			go: function (state) {
			}
		};
		var mockScope;
		var mockAuth = {
			login: function () {
			},
			logout: function () {
			}
		};
		var mockSession = {
			getUser: function () {
				return {
					id: '1234',
					username: 'user',
					password: 'user_password'
				}
			}
		};
		var secu_events = {
			loginSuccess: 'security:login-success',
			loginFailed: 'security:login-failed'
		};

		beforeEach(function () {
			bard.inject('$rootScope');
			mockScope = $rootScope.$new();
			mockScope.credentials = {
				username: 'user',
				password: 'user_password'
			};

			var loggerFactory = new MockLoggerFactory();
			mockLogger = loggerFactory.getLogger();
			ctrl = new LoginController(mockScope, mockState, loggerFactory, mockAuth, mockSession, secu_events);
			sinon.spy(mockScope, '$on');
			sinon.spy(mockAuth, 'login');
			sinon.spy(mockState, 'go');
		});

		afterEach(function () {
			mockScope.$on.restore();
			mockAuth.login.restore();
			mockState.go.restore();
		});

		it('attempts to authenticate the user when login button pressed', function () {
			ctrl.onLogin('user', 'password');
			expect(mockAuth.login).called;
			expect(mockAuth.login.getCall(0).args[0]).equal('user');
			expect(mockAuth.login.getCall(0).args[1]).equal('password');
		});

		it('logs an error if a login error event received', function () {
			$rootScope.$broadcast(secu_events.loginFailed, {});
			expect(mockLogger.success).not.called;
			expect(mockLogger.error).called;
			expect(mockState.go).not.called;
		});

		it('logs an error if a login error event received (with well formed error data)', function () {
			$rootScope.$broadcast(secu_events.loginFailed, {data: {description: 'Whoops!'}});
			expect(mockLogger.success).not.called;
			expect(mockLogger.error).called;
			expect(mockState.go).not.called;
		});

		it('logs a success message and transitions to main state if a login success event received', function () {
			$rootScope.$broadcast(secu_events.loginSuccess, {});
			expect(mockLogger.success).called;
			expect(mockLogger.error).not.called;
			expect(mockState.go).called;
			expect(mockState.go.getCall(0).args[0]).equals('main');
		});

		it('logs an error if login success event received but no user session found', function () {
			mockSession.getUser = function() { return null; }
			$rootScope.$broadcast(secu_events.loginSuccess, {});
			expect(mockLogger.success).not.called;
			expect(mockLogger.error).called;
			expect(mockState.go).not.called;
		});
	});
});
