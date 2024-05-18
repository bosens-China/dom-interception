import { build } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dts from "vite-plugin-dts";

const list = [
  {
    entry: "./src/index.ts",
    name: "interception",
  },
  {
    entry: "./src/domInterception.ts",
    name: "domInterception",
  },
  {
    entry: "./src/nodeDomInterception.ts",
    name: "nodeDomInterception",
  },
];

(async () => {
  for (let i = 0; i < list.length; i++) {
    await build({
      build: {
        emptyOutDir: !i,
        lib: {
          ...list[i],
          formats: ["es", "umd"],
          fileName(format, entryName) {
            return `${entryName}-${format}.js`;
          },
        },
        rollupOptions: {
          external: ["jsdom"],
        },
      },

      plugins: [
        nodePolyfills(),
        dts({
          exclude: "./src/__test__",
        }),
      ],
    });
  }
})();
