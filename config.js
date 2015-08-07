var path = require('path');
var package = require('./package.json');
var tsConfig = require('./tsconfig.json');
var tsd = require('./tsd.json');

var tsConfig = function() {
  return require('./tsconfig.json');
};

var tsd = function() {
 return require('./tsd.json');
};

var package = function() {
  return require('./package.json');
}

var outDir = function() {
  return tsConfig().compilerOptions.outDir;
}

var join = function(a, b) {
  return path.join(a, b);
}

var jo = function(a) {
  return join(outDir(), a);
}

module.exports = {
  'tsConfigFile': 'tsconfig.json',
  'tsconfig': tsConfig,
  'tsd': tsd,
  'package': package,
  'tsOutDir': outDir(),
  'tsFiles': './app/scripts/**/*.ts',
  'port': 3000,
  'outDir': outDir(),
  'stylesDir': 'app/styles',
  'htmlFiles': 'app/**/*.html',
  'htmlFilesOut': outDir(),
  'imageFiles': 'app/images/**/*',
  'imageFilesOut': outDir() + '/images',
  'fontFiles': 'app/fonts/**/*',
  'fontFilesOut': outDir() + '/fonts',
  'htmlDir': 'app/',
  'sassFiles': 'app/styles/**/*.scss',
  'cssDir' : './css/',
  'cssFilesOut': outDir() + '/styles',
  'baseDirs': ['dist', 'app'],
  'routes': {'/bower_components': 'bower_components', '/dist': 'dist'},
  'testFiles': jo('test/**/*.spec.js')
}
