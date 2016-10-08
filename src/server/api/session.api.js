'use strict';

var router = require('express').Router();
var error = require('./error.response.js');

router.get('/session', sessionResource);

module.exports = router;

function sessionResource(req, res, next) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, ' +
		'max-stale=0, post-check=0, pre-check=0');
	if (!req.session) {
		error(req, res, 401, 'Unauthorized', 'User not logged in');
	} else if (!req.session.hasOwnProperty('user')) {
		error(req, res, 401, 'Unauthorized', 'Invalid or expired session');
	} else {
		res.status(200).send({user: req.session.user});
	}
}
