var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
var del     = require('del');
var ac      = require('autoprefixer-core');
var wiredep = require('wiredep').stream;
var config  = require('./config.js')

var ts = $.typescript;

var tsProject = ts.createProject(config.tsConfigFile);
var browserSync  = require('browser-sync').create();

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

gulp.task('styles', function() {
  return gulp.src(config.sassFiles)
    .pipe($.sass())
    .on('error', handleError)
    .pipe($.postcss([ac({browsers: ['last 1 version']})]))
    .on('error', handleError)
    .pipe(gulp.dest(config.outDir));
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

gulp.task('serve', function() {
  browserSync.init({
    'server': {
      'baseDir': config.baseDirs,
      'routes': config.routes
      },
    'port': config.port
  });
});

gulp.task('_build', ['styles', 'images', 'fonts', 'scripts', 'html']);
gulp.task('build', function() {
  failOnErrors = true;
  gulp.start('_build');
});

gulp.task('default', function() {
   gulp.watch(config.tsFilesGlob, ['transpile-ts2js']);
   gulp.watch(config.htmlDir, browserSync.reload);
   gulp.watch(config.cssDir, browserSync.reload);
});
