/* jshint -W117 */
'use strict';

exports.set = function (delay) {
	var origFn = browser.driver.controlFlow().execute;
	browser.driver.controlFlow().execute = function () {
		var args = arguments;
		origFn.call(browser.driver.controlFlow(), function () {
			return protractor.promise.delayed(delay);
		});
		return origFn.apply(browser.driver.controlFlow(), args);
	};
};
