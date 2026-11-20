import { defineConfig } from "cypress";
import registerCodeCoverageTasks from "@cypress/code-coverage/task";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://127.0.0.1:5173/ai-playground",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" || browser.name === "electron") {
          launchOptions.args.push("--no-sandbox");
          launchOptions.args.push("--disable-dev-shm-usage");
          launchOptions.args.push("--disable-gpu");
        }
        return launchOptions;
      });
      return config;
    },
  },
});

