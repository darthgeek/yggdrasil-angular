/* jshint -W117 */
'use strict';

var loginMod = require('../lib/login-out.js');
var protractorDelay = require('../lib/protractor-delay.js');

describe('tests/e2e', function () {
	describe('basic-nav.spec.js', function () {
		beforeEach(function () {
			loginMod.clearSession();
			// protractorDelay.set(200);
		});

		it('invalid path when not logged in redirects to login page', function () {
			browser.get('somenonexistantpage');
			return expect(browser.getCurrentUrl()).eventually.endsWith('/login');
		});

		it('invalid path when logged in reports page not found and remains on same URL', function (done) {
			loginMod.login('test_user', 'password')
				.then(function () {
					browser.get('somenonexistantpage');
					Promise.all([
						expect(browser.getCurrentUrl()).eventually.endsWith('/somenonexistantpage'),
						expect(browser.getTitle()).eventually.contains('Page Not Found')
					]).then(function () {
						done();
					}).catch(function (reason) {
						done(reason);
					});
				});
		});

		it('landing URL when not authenticated redirects to the login page', function () {
			browser.get('/');
			return expect(browser.getCurrentUrl()).eventually.endsWith('/login');
		});

		it('app login and logout as a regular user ends up on login page', function () {
			browser.get('/');
			loginMod.login('test_user', 'password');
			loginMod.logout();
			return expect(browser.getCurrentUrl()).eventually.endsWith('/login');
		});

		it('login page when already authenticated redirects to the main URL', function () {
			browser.get('/login');
			loginMod.login('test_user', 'password');
			browser.get('/login');
			return expect(browser.getCurrentUrl()).eventually.endsWith('/');
		});
	});
});
