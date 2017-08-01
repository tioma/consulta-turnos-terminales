/**
 * Created by kolesnikov-a on 01/08/2017.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cleanCss = require('gulp-clean-css');
var duration = require('gulp-duration');
var htmlreplace = require('gulp-html-replace');
var minify = require('gulp-minify');
var babel = require('gulp-babel');


gulp.task('minify', function(){
	gulp.src(['app.js', 'config.production.js', 'class/*.js',  'consulta/*.js', 'services/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(minify({
			ext: {
				min: '.min.js'
			},
			noSource: true
		}).on('error', function(e) {
			console.log(e);
		}))
		.pipe(gulp.dest('build'))
});

gulp.task('minify-css', function() {
	gulp.src(['css/app.css', 'css/dialogs.css'])
	// Combine all CSS files found inside the src directory
		.pipe(concatCss('styles.min.css'))
		// Minify the stylesheet
		.pipe(cleanCss({ debug: true }))
		// Write the minified file in the css directory
		.pipe(gulp.dest('build/css'));
	// place code for your default task here
});

gulp.task('html-replace', function() {
	gulp.src('index.html')
		.pipe(htmlreplace({
			'css': {
				src: ['css/styles.min.css', 'css/bootstrap.cerulean.min.css']
			},
			'bower': {
				src: ['lib/angular/angular.min.js',
					'lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
					'lib/angular-socket-io/socket.min.js',
					'lib/angular-ui-router/angular-ui-router.min.js'
				]
			},
			'app': 'app.min.js',
			'socket': 'lib/socket.io.min.js'
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('copy-files', function(){
	var templates = {
		"consulta": "consulta/*.html",
		"services/dialogs": "services/dialogs/*.html",
		"lib": "js/*",
		"images": "images/*",
		"fonts": "fonts/*",
		"css": "css/bootstrap.cerulean.min.css"
	};
	for (var template in templates) {
		console.log(template);
		gulp.src(templates[template])
			.pipe(gulp.dest("build/" + template))
	}
});

gulp.task("copy-bower-dependencies", function () {
	var paths = {
		bower: "bower_components/",
		lib: "build/lib/"
	};

	var bower = {
		"angular": "angular/*.min*",
		"angular-bootstrap": 'angular-bootstrap/{*-tpls.min*,uib/**}',
		"angular-socket-io": 'angular-socket-io/*.min*',
		"angular-ui-router": 'angular-ui-router/release/*.min*'
	};

	for (var destinationDir in bower) {
		console.log(destinationDir);
		gulp.src(paths.bower + bower[destinationDir])
			.pipe(gulp.dest(paths.lib + destinationDir));
	}
});

gulp.task('default', ['minify-css', 'html-replace', 'copy-bower-dependencies', 'copy-files', 'minify']);