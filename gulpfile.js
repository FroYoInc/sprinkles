var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
var del     = require('del');
var ac      = require('autoprefixer-core');
var wiredep = require('wiredep').stream;
var config  = require('./config.js')
var proxyMiddleware = require('http-proxy-middleware');


var ts = $.typescript;

var tsProject = ts.createProject(config.tsConfigFile);
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;

var failOnErrors = false;
var handleError = function(err) {
  $.util.log(err.message);
  if (failOnErrors) {
    process.exit(1);
  }
}

gulp.task('clean-ts', function(cb) {
  del(config.tsOutDir, cb);
});

gulp.task('clean-dist', function(cb) {
  del(config.outDir, cb);
});

gulp.task('clean', ['clean-ts', 'clean-dist']);

gulp.task('transpile-ts2js', function () {
  return tsProject.src(config.tsFiles)
    .pipe(ts(tsProject))
    .on('error', handleError)
    .js
    .pipe(gulp.dest(config.tsOutDir));
});

gulp.task('scripts', ['transpile-ts2js'], function() {
	gulp.src(['./dist/app/scripts/**/*.*'])
		.pipe(gulp.dest('dist/dist/app/scripts'));
});

gulp.task('styles', function() {
  return gulp.src(config.sassFiles)
    .pipe($.sass())
    .on('error', handleError)
    .pipe($.postcss([ac({browsers: ['last 1 version']})]))
    .on('error', handleError)
    .pipe(gulp.dest(config.cssFilesOut))
    .pipe(reload({stream: true}));
});

gulp.task('html', ['styles'], function() {
	gulp.src(['./app/index.html'])
		.pipe(gulp.dest('dist/'));

	gulp.src(['./app/views/**/*.*'], { base: './app/views/' })
		.pipe(gulp.dest('dist/views'));
});

gulp.task('images', function() {
	return gulp.src(config.imageFiles)
		.pipe(gulp.dest(config.imageFilesOut));
});

gulp.task('fonts', function() {
  return gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/**/*.*')
    .pipe(gulp.dest('dist/fonts/bootstrap/'))
});

gulp.task('wiredep-styles', function() {
  return gulp.src(config.sassFiles)
    .pipe(wiredep({'ignorePath': /^(\.\.\/)+/}))
    .on('error', handleError)
    .pipe(gulp.dest(config.stylesDir));
});

gulp.task('wiredep-html', function() {
  return gulp.src(config.htmlFiles)
    .pipe(wiredep({'ignorePath': /^(\.\.\/)+/}))
    .on('error', handleError)
    .pipe(gulp.dest(config.htmlDir));
});

gulp.task('wiredep', ['wiredep-styles', 'wiredep-html']);

var proxy = proxyMiddleware('/api', {target: 'http://localhost:8080/'});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    browser: 'google chrome',
    'server': {
      'baseDir': config.baseDirs,
      'routes': config.routes,
      'middleware': [proxy]
      },
    'port': config.port
  });

  gulp.watch([
    config.htmlFiles,
    config.outDir,
    config.imageFiles,
    config.fontFiles
  ]).on('change', reload);

  gulp.watch(config.tsFiles, ['transpile-ts2js']);
  gulp.watch(config.sassFiles, ['styles']);
  gulp.watch(config.fontFiles, ['fonts']);
  gulp.watch(config.bowerFile, ['wiredep']);
});

gulp.task('_build', ['styles', 'images', 'fonts', 'scripts', 'html', 'move-bower']);
gulp.task('build', function() {
  failOnErrors = true;
  gulp.start('_build');
});

gulp.task('move-bower', function() {
	gulp.src(['./bower_components/**/*.*'], { base: './' })
		.pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
   gulp.watch(config.tsFilesGlob, ['transpile-ts2js']);
   gulp.watch(config.htmlDir, browserSync.reload);
   gulp.watch(config.cssDir, browserSync.reload);
});
