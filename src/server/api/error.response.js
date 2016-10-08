'use strict';

module.exports = function (req, res, status, message, description) {
	var data = {
		status: status,
		message: message,
		description: description,
		url: req.originalUrl
	};
	res.status(status)
		.send(data)
		.end();
};
