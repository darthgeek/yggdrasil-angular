var webpack = require('webpack');
var gulpConfig = require('app-root-path').require('gulp.config.js')();
var _ = require('lodash');
var proxyMiddleware = require('http-proxy-middleware');

var precss = require('precss');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var modRewrite = require('connect-modrewrite');

/**
 * Default options for webpack.
 * @type {{env: string, serve: boolean}}
 * @private
 */
var _defaultOpts = {
	/** dev, test or prod. */
	env: 'dev',
	/** true to start browser-sync for serving app. */
	serve: false
};

/**
 * Webpack configuration for various build environments.
 * @param opts
 * @return {object}
 */
module.exports = function (opts) {
	var _opts = _.extend(_defaultOpts, opts);

	// Common configuration for all environments
	var config = {
		cache: true,

		resolve: {
			extensions: ['', '.js'],
			modulesDirectories: [
				'./',
				gulpConfig.dir.client,
				gulpConfig.dir.nodeModules,
			],
			alias: {
				'bardjs': 'node_modules/bardjs/dist/bard.js'
			}
		},

		node: {
			fs: 'empty', // avoids error messages
			net: 'empty',
			tls: 'empty',
			dgram: 'empty'
		},

		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
			new webpack.SourceMapDevToolPlugin({
				filename: '[name].[hash].js.map',
				module: true,
				moduleFilenameTemplate: 'webpack:///[resource-path]'
			})
		],

		module: {
			postLoaders: [],
			loaders: [
				{
					test: /\.hbs$/,
					loader: 'handlebars-template'
				},
				{
					test: /\.html$/,
					loader: 'ngtemplate?relativeTo=' + gulpConfig.dir.client + '!html'
				},
				{
					test: /\.json$/,
					loader: 'json'
				},
				{
					test: /\.png?(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'url?limit=10000&mimetype=image/png'
				},
				{
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: "url-loader?limit=30000&minetype=application/font-woff"
				},
				{
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: "file-loader"
				},
				{
					test: /^bardjs/,
					loaders: [
						'export?bard!bardjs'
					],
				}
			]
		},

		postcss: function () {
			if (_opts.env === 'prod') {
				return [precss, autoprefixer, cssnano];
			} else {
				return [precss, autoprefixer];
			}
		},

		sassLoader: {
			includePaths: [gulpConfig.dir.client + 'app/sass']
		}
	}

	// Environment-specific configuration
	switch (_opts.env) {
		case 'dev':
			configApp();
			configCssLoaders(_opts.env);
			if (_opts.serve) {
				configBrowserSync();
			}
			break;
		case 'prod':
			configApp();
			configCssLoaders(_opts.env);
			configOptimization();
			if (_opts.serve) {
				configBrowserSync();
			}
			break;
		case 'test':
			configUnitTest();
			configCssLoaders(_opts.env);
			break;
		default:
			throw Error('unsupported webpack env \'' + env + '\'');
	}

	return config;

	////////////////////////////

	/**
	 * Configures webpack to assemble the application.
	 */
	function configApp(env) {
		config.entry = {
			'client': gulpConfig.dir.client + 'app/app.module.js'
		};
		config.output = {
			path: gulpConfig.dir.build,
			filename: '[name].[hash].js',
			chunkFilename: '[name].[id].[chunkhash].js'
		};
		config.plugins.unshift(
			new webpack.optimize.CommonsChunkPlugin({
				name: 'common',
				filename: 'common.[hash].js'
			}),
			new HtmlWebpackPlugin({
				title: gulpConfig.appTitle,
				template: gulpConfig.dir.client + 'index.hbs',
				favicon: gulpConfig.dir.client + 'favicon.ico',
				minify: 'prod' === env ? gulpConfig.htmlminOptions.prod : gulpConfig.htmlminOptions.dev
			})
		);
	}

	/**
	 * Configures loading of CSS files (inline for dev or separate files for prod).
	 * @param env
	 */
	function configCssLoaders(env) {
		if ('prod' === env) {
			config.module.loaders.unshift(
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					loaders: [
						'style',
						'css?sourceMap',
						'postcss',
						'resolve-url-loader',
						'sass?sourceMap']
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract(
						'style',
						'resolve-url-loader',
						'css?sourceMap',
						'postcss'
					)
				}
			);
			config.plugins.unshift(
				new ExtractTextPlugin('[name].[contenthash].css')
			);
		} else {
			config.module.loaders.unshift(
				{
					test: /\.scss$/,
					// exclude: /node_modules/,
					loaders: [
						'style',
						'css?sourceMap',
						'postcss',
						'resolve-url-loader',
						'sass?sourceMap',
					]
				},
				{
					test: /\.css$/,
					loaders: [
						'style',
						'css?sourceMap',
						'postcss',
						'resolve-url-loader'
					]
				}
			);
			config.plugins.unshift(
				new ExtractTextPlugin('[name].[contenthash].css')
			);
		}
	}

	/**
	 * Configures webpack to run browser sync and watch for code changes.
	 */
	function configBrowserSync() {
		var apiProxyUrl = 'http://localhost:' + gulpConfig.apiPort;
		var syncProxyUrl = 'http://localhost:' + gulpConfig.apiPort;

		config.watch = true;
		config.plugins.unshift(
			new BrowserSyncPlugin({
				host: 'localhost',
				port: gulpConfig.serverPort || 3000,
				reloadDelay: 500,
				server: {
					baseDir: [gulpConfig.dir.build],
					middleware: [
						modRewrite([
							'!\\.\\w+$ /index.html [L]'
						]),
						proxyMiddleware('/api', {target: apiProxyUrl}),
						proxyMiddleware('/sink', {target: syncProxyUrl})
					]
				}
			}));
	}

	/**
	 * Configures webpack to perform production optimizations and packaging.
	 */
	function configOptimization() {
		config.plugins.unshift(
			new ngAnnotatePlugin({
				add: true
			}),
			new webpack.optimize.OccurenceOrderPlugin(true),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				mangle: true
			}),
			new webpack.optimize.AggressiveMergingPlugin()
		);
	}

	/**
	 * Configures webpack to instrument code for unit tests.
	 */
	function configUnitTest() {
		config.module.postLoaders.unshift(
			{
				test: /src\/client\/app\/.*\.js$/,
				exclude: /\.spec\.js$/,
				loader: 'istanbul-instrumenter'
			}
		);
	}
};
