module.exports = function(config) {
   config.set({
     frameworks: ['jasmine'],

     plugins: [
     'karma-phantomjs-launcher',
     'karma-jasmine',
     'karma-coverage'
     ],

     // start these browsers
     browsers: ['PhantomJS'],

     reporters: ['progress', 'coverage'],

     preprocessors: {
     'dist/app/**/*.js': ['coverage']
     },

     coverageReporter: {
     type: 'html',
     dir: 'coverage'
     },

     logLevel: config.LOG_INFO,

     singleRun: true
   });
};
