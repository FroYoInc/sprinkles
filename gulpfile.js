var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var del    = require('del');
var config = require('./config.js')

$.ts  = $.typescript;
$.del = del;

var tsProject = $.ts.createProject(config.tsConfigFile);
var browserSync  = require('browser-sync').create();

var failOnErrors = false;
var handleError = function(err) {
  if (failOnErrors) {
    $.util.log(err.message);
    process.exit(1);
  }
}

gulp.task('transpile-ts2js', function () {
  return tsProject.src()
    .pipe($.ts(tsProject))
    .on('error', handleError)
    .js
    .pipe(gulp.dest(config.tsOutDir));
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
