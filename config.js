var path = require('path');
var package = require('./package.json');
var tsConfig = require('./tsconfig.json');
var tsd = require('./tsd.json');

module.exports = {
  'tsConfigFile': 'tsconfig.json',
  'tsconfig': tsConfig,
  'tsd': tsd,
  'package': package,
  'tsOutDir': tsConfig.compilerOptions.outDir,
  'tsFiles': tsConfig.filesGlob,
  'port': 3000,
  'outDir': tsConfig.compilerOptions.outDir,
  'stylesDir': 'app/styles',
  'htmlFiles': 'app/*.html',
  'imageFiles': 'app/images/**/*',
  'fontFiles': 'app/fonts/**/*',
  'htmlDir': 'app/',
  'sassFiles': 'app/styles/**/*.scss',
  'cssDir' : './css/',
  'baseDirs': ['app'],
  'routes': {'/bower_components': 'bower_components'}
}
