const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    locale: 'sv-SE',
    timezoneId: 'Europe/Stockholm',
    baseURL: 'https://app.mars.matteappen.se/',
    //baseURL: 'https://app.magmamath.com/',
    headless: false,
    launchOptions: {
      slowMo: 300,
  },
  },
});

