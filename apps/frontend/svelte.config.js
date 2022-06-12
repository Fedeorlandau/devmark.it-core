import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true,
  }),
  kit: {
    adapter: vercel(),
    vite: {
      resolve: {
        alias: {
          "@ui": path.resolve("./src/ui"),
          "@utils": path.resolve("./src/utils"),
          "@lib": path.resolve("./src/lib"),
        },
      },
    },
  },
};

export default config;
