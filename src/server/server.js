'use strict';

var express = require('express');
var server = express();
var log = require('log4js').getLogger('src/server/server.js');
var gulpConfig = require('app-root-path').require('gulp.config.js')();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var accessLogger = require('morgan');
var session = require('express-session');
var uuid = require('uuid');
var cors = require('cors');
var error = require('./api/error.response.js');


server.use(session({
	genid: function (req) {
		return uuid.v4();
	},
	secret: '65ecea42-f47f-4d26-b5cd-f6a25b29d7c1',
	resave: false,
	saveUninitialized: false
}));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors());
server.use(accessLogger('dev'));

server.use('/sink', function (req, res, next) {
	res.status(204).send();
});

server.use('/api', require('./api/session.api'));
server.use('/api', require('./api/login.api'));
server.use('/api', require('./api/logout.api'));

server.use('/*', function(req, res, data) {
	error(req, res, 404, 'Not Found', 'Resource not found on this server');
});

server.listen(process.env.NODE_PORT, function () {
	log.info('Express server listening on port ' + process.env.NODE_PORT +
		'\n\t        env = ' + server.get('env') +
		'\n\t  __dirname = ' + __dirname +
		'\n\t    root = ' + gulpConfig.dir.root +
		'\n\tprocess.cwd = ' + process.cwd());
});
