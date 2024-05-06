import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/main.ts",
      name: "domInterception",
      formats: ["es", "umd"],
    },
  },
  plugins: [
    dts({
      exclude: "./src/__test__",
    }),
  ],
});
