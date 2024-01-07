// karma.conf.js
module.exports = function(config) {
    config.set({
      frameworks: ['jasmine'],
      files: [
        'pwa/pages/graphs/BarChart.tsx',
        'pwa/tests/BarChart.spec.js',
      ],
      browsers: ['Firefox'],
      reporters: ['progress'],
    });
  };
  