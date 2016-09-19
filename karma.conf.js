module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'commonjs'],
    files: ['dist/cjs/*.js'],
    exclude: [],
    preprocessors: {
      'dist/cjs/rpsls.js': ['coverage'],
      'dist/cjs/*.js': ['commonjs']
    },
    coverageReporter: {
      reporters: [{
        type: 'json',
        subdir: '.',
        file: 'coverage-final.json'
      }]
    },
    reporters: ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Firefox'],
    singleRun: false,
    concurrency: Infinity
  })
}
