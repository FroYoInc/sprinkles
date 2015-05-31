var path = require('path');
var package = require('./package.json');
var tsConfig = require('./tsconfig.json');
var tsd = require('./tsd.json');

var outDir = tsConfig.compilerOptions.outDir;
module.exports = {
  'tsConfigFile': 'tsconfig.json',
  'tsconfig': tsConfig,
  'tsd': tsd,
  'package': package,
  'tsOutDir': outDir,
  'tsFiles': outDir,
  'port': 3000,
  'outDir': outDir,
  'stylesDir': 'app/styles',
  'htmlFiles': 'app/*.html',
  'htmlFilesOut': outDir,
  'imageFiles': 'app/images/**/*',
  'imageFilesOut': outDir + '/images',
  'fontFiles': 'app/fonts/**/*',
  'fontFilesOut': outDir + '/fonts',
  'htmlDir': 'app/',
  'sassFiles': 'app/styles/**/*.scss',
  'cssDir' : './css/',
  'cssFilesOut': outDir + '/styles',
  'baseDirs': ['app'],
  'routes': {'/bower_components': 'bower_components'}
}
