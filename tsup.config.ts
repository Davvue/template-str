import { defineConfig } from "tsup";

export default defineConfig({
  platform: "neutral",
  entry: ["src/index.ts"],
  format: ["esm", "cjs", "iife"],
  target: "es2019",
  sourcemap: false,
  clean: true,
  dts: true, // generate .d.ts files
  outExtension(ctx) {
    let extension = "";
    switch (ctx.format) {
      case "cjs":
        extension = "cjs";
        break;
      case "esm":
        extension = "mjs";
        break;
      case "iife":
        extension = "global.js";
        break;
      default:
        extension = `${ctx.format}.js`;
    }
    return {
      js: `.${extension}`,
    };
  },
});
