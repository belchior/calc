
module.exports = {
  preset: "jest-puppeteer",
  rootDir: '../',
  bail: true,
  testMatch: ['<rootDir>/src/**/*.e2e.js'],
  // testMatch: ['<rootDir>/src/components/Calc/Custom/**/*.e2e.js'],
};
