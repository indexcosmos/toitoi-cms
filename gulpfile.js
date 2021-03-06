var path = require('path');
var http = require('http');

var gulp = require('gulp');
var rename = require('gulp-rename');

var sass = require('gulp-sass');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');

var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');

var express = require('express');
var fs = require('fs');
var app = express();

function getPostCSSPlugins() {
	/* To add PostCSS plugins:
	 * 1. `npm install --save-dev $PLUGIN_NAME` (the --save-dev flag is important!)
	 * 2. Add `require('$PLUGIN_NAME')` to the array below.
	 * 3. Double-check plugin documentation to see whether anything needs to be configured.
	 *    The `createWebpackTask` function below is where all Webpack configuration goes.
	 */
	return [
		require('autoprefixer')
	];
}

function startLocalServer() {
	var port = 4000;
	// serve static assets normally
	app.use(express.static(__dirname + '/public'))
	// handle every other route with index.html, which will contain
	// a script tag to your application's JavaScript file(s).
	app.get('*', function (request, response){
  	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
	})

	return http.createServer(app)
		.listen(port)
		.on('listening', function() {
			console.log('Static server listening on port ' + port.toString());
	});
}

function createWebpackTask(options) {
	var options = (options != null) ? options : {};

	return function() {
		var plugins = [];

		if (options.production) {
			var targetFilename = 'bundle.min.js';
			plugins.push(new webpack.optimize.UglifyJsPlugin({}))
		} else {
			var targetFilename = 'bundle.js';
		}

		return gulp.src('./src/index.jsx')
		// return gulp.src('./src/app.jsx')
			.pipe(plumber())
			.pipe(webpackStream({
				watch: !(options.production),
				module: {
					loaders: [{
						test: /\.jsx?$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel',
						query: {
							presets: ['react', 'es2015', 'stage-1']
						}
					}, {
						test: /\.scss$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'style!css!postcss!sass'
					}]
				},
				resolve: {
					extensions: [
						'',
						'.web.js', '.js',
						'.web.jsx', '.jsx'
					]
				},
				plugins: plugins,
				postcss: getPostCSSPlugins()
			}))
			.pipe(rename(targetFilename))
			.pipe(gulp.dest('./public/js/'));
	}
}

function createSassTask(options) {
	var options = (options != null) ? options : {};

	return function() {
		var normalize = require('normalize');
		var bourbon = require('node-bourbon');
		var neat = require('node-neat');

		return gulp.src('./src/scss/**/*')
			.pipe(plumber())
			.pipe(sass({
				includePaths: [].concat(normalize.includePaths, bourbon.includePaths, neat.includePaths),
				outputStyle: (options.production) ? 'compressed' : 'nested'
			}))
			.pipe(rename(function(path) {
				if (options.production) {
					path.basename += '.min';
				}
			}))
			.pipe(gulp.dest('./public/css/'))
	}
}

function createImagesTask(options) {
	var options = (options != null) ? options : {};

	return function() {
		return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./public/img'));
    // .pipe(notify({ message: 'Images task complete' }));
	}

}

gulp.task('serve', function() {
	startLocalServer();
});

gulp.task('webpack', createWebpackTask());

gulp.task('webpack-production', createWebpackTask({
	production: true
}));

gulp.task('sass', createSassTask());

gulp.task('sass-production', createSassTask({
	production: true
}));

gulp.task('images', createImagesTask());

gulp.task('images-production', createImagesTask({
	production: true
}));

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(['./src/scss/**/*'], ['sass']);
	gulp.watch( './src/img/**/*', [ 'img' ] );
	gulp.watch(['./public/**/*'], livereload.changed);

	startLocalServer().on('listening', function() {
		livereload.changed('*');
	});
});

gulp.task('default', ['webpack', 'sass', 'images', 'watch']);
gulp.task('build', ['webpack-production', 'sass-production', 'images-production']);
