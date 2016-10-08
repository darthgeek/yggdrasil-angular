/* jshint -W117,-W030 */
'use strict';

var AuthService = require('auth.service.js');
var MockLoggerFactory = require('test/mock-logger.factory.js');

describe('app/core/security', function () {
	describe('auth.service.js', function () {
		var service;
		var secu_events = {
			loginSuccess: 'security:login-success',
			loginFailed: 'security:login-failed',
			logoutSuccess: 'security:logout-success'
		};
		var MockSessionService = {
			create: function (user) {
			},
			destroy: function () {
			}
		};

		beforeEach(function () {
			bard.inject('$httpBackend', '$http', '$rootScope');
			service = new AuthService($http, $rootScope, new MockLoggerFactory(), MockSessionService, secu_events);
			sinon.stub(MockSessionService, 'create');
			sinon.stub(MockSessionService, 'destroy');
			sinon.spy($rootScope, '$broadcast');
		});

		afterEach(function () {
			MockSessionService.create.restore();
			MockSessionService.destroy.restore();
			$rootScope.$broadcast.restore();
		});

		it('creates session and broadcasts event if successfully logged in by server', function () {
			$httpBackend.expect('POST', '/api/login').respond(200, {
				user: {
					id: '1234',
					handle: 'username',
					roles: ['ROLE_1', 'ROLE_2']
				}
			});
			service.login();
			$httpBackend.flush();
			expect($rootScope.$broadcast.getCall(0).args[0]).equal(secu_events.loginSuccess);
			expect($rootScope.$broadcast.getCall(0).args[1]).ownProperty('id');
			expect($rootScope.$broadcast.getCall(0).args[1].id).equal('1234');
			expect(MockSessionService.create.getCall(0).args[0]).ownProperty('id');
			expect(MockSessionService.create.getCall(0).args[0].id).equals('1234');
			expect(MockSessionService.destroy).not.called;
		});
		it('broadcasts event if not successfully logged in by server', function () {
			$httpBackend.expect('POST', '/api/login').respond(401, {});
			service.login();
			$httpBackend.flush();
			expect($rootScope.$broadcast.getCall(0).args[0]).equal(secu_events.loginFailed);
			expect(MockSessionService.create).not.called;
			expect(MockSessionService.destroy).not.called;
		});
		it('destroys session and broadcasts event if successfully logged out by server', function () {
			$httpBackend.expect('POST', '/api/logout').respond(204, {});
			service.logout();
			$httpBackend.flush();
			expect($rootScope.$broadcast.getCall(0).args[0]).equal(secu_events.logoutSuccess);
			expect(MockSessionService.create).not.called;
			expect(MockSessionService.destroy).called;

		});
	});
});
