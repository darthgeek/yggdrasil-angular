'use strict';

var resolve = require('app-root-path').resolve;
var glob = require('glob-all');

module.exports = function () {
	var dir = {
		root: resolve('/'),
		src: resolve('/src/'),
		client: resolve('/src/client/'),
		server: resolve('/src/server/'),
		unit: resolve('/src/client/test/'),
		e2e: resolve('/src/test/e2e/'),
		nodeModules: resolve('/node_modules/'),
		build: resolve('/build/'),
		report: resolve('/report/')
	};

	var config = {
		appTitle: 'Yggdrasil',

		serverPort: 3000,
		apiPort: 4000,

		js: glob.sync([
			dir.client + 'app/**/*.js',
			'!**/*.spec.js'
		]),

		jsVet: glob.sync([
			'**/*.js',
			'!node_modules/**/*'
		]),

		unitSpecs: glob.sync([
			dir.src + '**/*.spec.js'
		]),

		e2eSpecs: dir.e2e + '**/*.spec.js',

		packageFiles: [
			dir.root + 'package.json'
		],

		dir: dir,

		clientMain: dir.client + 'app/app.module.js',

		htmlminOptions: {
			prod: {
				'collapseBooleanAttributes': true,
				'collapseWhitespace': true,
				'conservativeCollapse': true,
				'decodeEntities': true,
				'maxLineLength': 120,
				'minifyJS': true,
				'preserveLineBreaks': false,
				'removeComments': true,
				'removeEmptyAttributes': true,
				'removeRedundantAttributes': true,
				'removeScriptTypeAttributes': true,
				'removeStyleLinkTypeAttributes': true
			},
			dev: {
				'collapseBooleanAttributes': true,
				'collapseWhitespace': true,
				'conservativeCollapse': true,
				'decodeEntities': true,
				'preserveLineBreaks': true,
				'removeEmptyAttributes': true,
				'removeRedundantAttributes': true,
				'removeScriptTypeAttributes': true,
				'removeStyleLinkTypeAttributes': true
			}
		},

		nodeOptions: {
			script: dir.server + 'server.js',
			delayTime: 1,
			nodeArgs: [
				'--debug=5858'
			],
			env: {
				'PORT': process.env.npm_package_config_serverPort || 8000,
				'NODE_ENV': 'dev'
			}
		},

		jsPlato: glob.sync([
			dir.client + '**/*.js'
		]),
		platoOptions: {
			title: 'Plato Inspections Report',
			exclude: /.*\.spec\.js/
		}
	}

	return config;

	///////////////////
}
