var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
var del     = require('del');
var ac      = require('autoprefixer-core');
var wiredep = require('wiredep').stream;
var config  = require('./config.js')
var cover = require('gulp-coverage');
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

var handleError = function(err) {
  if (failOnErrors) {
    $.util.log(err.message);
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

gulp.task('scripts', ['transpile-ts2js']);

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
});

gulp.task('images', function() {
});

gulp.task('fonts', function() {
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

gulp.task('_build', ['styles', 'images', 'fonts', 'scripts', 'html']);
gulp.task('build', function() {
  failOnErrors = true;
  gulp.start('_build');
});

gulp.task('unit-tests', ['transpile-ts2js'], function() {
  return gulp.src(config.testFiles)
    .pipe($.jasmine())
    .on('error', handleError);
});

gulp.task('coverage',['transpile-ts2js'], function() {
  return gulp.src(['dist/**/*.js']) //['dist/app/**/*.js']
      .pipe($.istanbul())
      .pipe($.istanbul.hookRequire())
      .on('finish', function () {
        gulp.src(['dist/**/*.js']) //['dist/test/**/*.js']
          .pipe($.jasmine({reporter: 'spec'}))
          .pipe($.jasmine({configFile: 'karma.conf.js', action: 'run'}))
          .pipe($.istanbul.writeReports('reports/'));
      });
})

gulp.task('default', function() {
   gulp.watch(config.tsFilesGlob, ['transpile-ts2js']);
   gulp.watch(config.htmlDir, browserSync.reload);
   gulp.watch(config.cssDir, browserSync.reload);
});
