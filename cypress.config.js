import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on) {
      on('before:browser:launch', (__browser = {}, launchOptions) => {
        launchOptions.args.push(
          '--use-file-for-fake-video-capture=cypress/fixtures/QRaw-qr.mjpeg'
        )

        return launchOptions;
      });
    },
  },
});
