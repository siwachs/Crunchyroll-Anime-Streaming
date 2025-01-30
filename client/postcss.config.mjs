import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {
      resolve: (id, basedir) => {
        if (id.startsWith("@styles/")) {
          const __dirname = dirname(fileURLToPath(import.meta.url));

          return resolve(
            __dirname,
            "src/assets/styles",
            id.replace("@styles/", ""),
          );
        }

        return id;
      },
    },

    "@tailwindcss/postcss": {},
  },
};

export default config;
