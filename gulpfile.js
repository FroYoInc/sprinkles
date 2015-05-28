var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var del    = require('del');
var ac     = require('autoprefixer-core');
var config = require('./config.js')

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
  return tsProject.src()
    .pipe(ts(tsProject))
    .on('error', handleError)
    .js
    .pipe(gulp.dest(config.tsOutDir));
});

gulp.task('styles', function() {
  return gulp.src(config.stylesDir)
    .pipe($.sass())
    .on('error', handleError)
    .pipe($.postcss([ac({browsers: ['last 1 version']})]))
    .on('error', handleError)
    .pipe(gulp.dest(config.outDir));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    'server': {'baseDir': config.htmlDir},
    'port': config.bsPort
  });
});

gulp.task('default', function() {
   gulp.watch(config.tsFilesGlob, ['transpile-ts2js']);
   gulp.watch(config.htmlDir, browserSync.reload);
   gulp.watch(config.cssDir, browserSync.reload);
});
