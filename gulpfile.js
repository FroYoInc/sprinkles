var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var spawn  = require('child_process').spawn;
$.del = require('del');
var config = require('./config.js')

var ts           = $.typescript;
var tsProject    = ts.createProject(config.tsConfigFile);
var failOnErrors = false;
$.ts = $.typescript;

// Require and Initialize browser sync with our configurtion
var browserSync  = require('browser-sync').create();

browserSync.init({
        server: {
            baseDir: config.htmlDir,
        },
        port: config.bsPort
});

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

gulp.task('default', function() {
   gulp.watch(config.tsFilesGlob, ['transpile-ts2js']);
   gulp.watch(config.htmlDir, browserSync.reload);
   gulp.watch(config.cssDir, browserSync.reload);
});