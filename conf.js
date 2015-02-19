exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/protractor_test_*.js'],
  // specs: ['test/protractor_test_custom_calc.js'],
  // specs: ['test/protractor_test_terminal.js'],
  // specs: ['test/protractor_test_macwidget.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true
  },
  multiCapabilities: [
    // {browserName: 'firefox'},
    {browserName: 'chrome', chromeOptions: {args: ['--test-type']}}
  ]
};
