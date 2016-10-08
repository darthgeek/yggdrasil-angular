/* jshint -W117 */
'use strict';

var loginPage = require('../page/login.page');

exports.login = function (username, password) {
	browser.manage().deleteAllCookies();
	browser.get('/');
	loginPage.page.setUsername(username);
	loginPage.page.setPassword(password);
	loginPage.page.clickSubmit();
	return expect(browser.getCurrentUrl()).eventually.endsWith('/');
};

exports.logout = function () {
	element(by.id('logout-action')).click();
	return expect(browser.getCurrentUrl()).eventually.endsWith('/login');
};

exports.clearSession = function () {
	browser.manage().deleteAllCookies();
};
