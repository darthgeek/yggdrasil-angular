'use strict';

var router = require('express').Router();

router.post('/logout', logout);

module.exports = router;

function logout(req, res, next) {
	if (req.session.hasOwnProperty('user')) {
		console.log('/api/logout: destroying session ' + req.session.id + ' for ' + req.session.user.id);
	}
	req.session.destroy();
	res.status(204).send();
}
