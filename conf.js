exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // specs: ['test/protractor_*'],
  specs: ['test/protractor_test_macwidget.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true
  },
  multiCapabilities: [
    // {browserName: 'firefox'},
    {
      browserName: 'chrome',
      chromeOptions: {args: ['--test-type']}
    }
  ]
};
