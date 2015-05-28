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
  'tsFilesGlob': tsConfig.filesGlob,
  'bsPort': 3000,
  'outDir': 'dist/',
  'stylesDir': 'app/styles/**/*.scss',
  'htmlDir': './html/',
  'cssDir' : './css/'
}
