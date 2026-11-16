const { defineConfig } = require('cypress');
module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  video: true,
  screenshotOnRunFailure: true,
  retries: 0,
  e2e: {
    baseUrl: 'https://demos.bellatrix.solutions',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    testIsolation: true,
  },
});
