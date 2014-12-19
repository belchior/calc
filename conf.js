exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/protractor_*.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true
  },
  multiCapabilities: [
    {browserName: 'firefox'},
    {browserName: 'chrome', chromeOptions: {args: ['--test-type']}}
  ]
};
