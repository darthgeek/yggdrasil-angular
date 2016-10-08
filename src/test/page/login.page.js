/* jshint -W117 */
'use strict';
var LoginPage = function () {
	this.username = element(by.css('input[name="username"]'));
	this.password = element(by.css('input[name="password"]'));
	this.submitButton = element(by.css('form[name="login-form"] button[type="submit"]'));
};

LoginPage.prototype.setUsername = function (text) {
	this.username.clear();
	this.username.sendKeys(text);
};

LoginPage.prototype.setPassword = function (text) {
	this.password.clear();
	this.password.sendKeys(text);
};

LoginPage.prototype.clickSubmit = function () {
	this.submitButton.click();
};

module.exports = {
	page: new LoginPage()
};
