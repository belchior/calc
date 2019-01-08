
module.exports = {
  preset: "jest-puppeteer",
  // setupTestFrameworkScriptFile: "expect-puppeteer",
  rootDir: '../',
  bail: true,
  testMatch: ['<rootDir>/src/**/*.e2e.js'],
  // testMatch: ['<rootDir>/src/components/Calc/Terminal/**/*.e2e.js'],
};
