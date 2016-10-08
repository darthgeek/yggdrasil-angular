'use strict';

var config = {
	appTitle: 'Yggdrasil',
	apiUrl: '/api',
	logEnabled: {
		TRACE: false,
		DEBUG: true
	}
};

angular.module('app.core')
	.value('config', config)
	.config(function (routerHelperProvider) {
		routerHelperProvider.configure({docTitle: config.appTitle + ': '});
	})
	.config(function(toastr) {
		toastr.options.timeOut = 4000;
		toastr.options.positionClass = 'toast-bottom-right';
	});
;
