// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@ui": path.resolve("./src/ui"),
      "@utils": path.resolve("./src/utils"),
      "@lib": path.resolve("./src/lib"),
    },
  },
};

export default config;
