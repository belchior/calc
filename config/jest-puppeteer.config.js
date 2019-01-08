const config = require('./puppeteer.config');

module.exports = {
  launch: { ...config.launchOptions },
  server: {
    command: `npm run serve`,
    port: 5000,
    launchTimeout: 10000,
    debug: false,
  },
}
