import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "im.paideia.app",
  appName: "paideia",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: "https://paideia.im",
  },
  // use https://paideia.im for production...
};

// for web build (use next links) for mobile use mui links

export default config;
