'use strict';

var router = require('express').Router();
var error = require('./error.response.js');

var data = require('../data/users.js');

router.post('/login', login);

module.exports = router;

function login(req, res, next) {
	var credentials = req.body;
	if (typeof credentials.username === 'undefined' || !credentials.username) {
		error(req, res, '401', 'Unauthorized', 'Missing username');
	} else if (typeof credentials.password === 'undefined' || !credentials.password) {
		error(req, res, '401', 'Unauthorized', 'Missing password');
	} else if (!data.hasOwnProperty(credentials.username)) {
		console.log('/api/login: non-existent user ' + credentials.username + ' in login request');
		error(req, res, '401', 'Unauthorized', 'Invalid credentials');
	} else if (data[credentials.username].password !== credentials.password) {
		console.log('/api/login:invalid password for ' + credentials.username + ' in login request');
		error(req, res, '401', 'Unauthorized', 'Invalid credentials');
	} else {
		req.session.user = {
			id: credentials.username,
			handle: data[credentials.username].handle,
			roles: data[credentials.username].roles
		};
		console.log('/api/login: created session ' + req.session.id + ' for ' + credentials.username);
		res.status(200).send({user: req.session.user});
	}
}
