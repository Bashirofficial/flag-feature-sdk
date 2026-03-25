import { defineConfig } from "tsup";

export default defineConfig({
  // Define both entry points here
  entry: {
    index: "src/index.ts",
    react: "src/react/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false, // Recommended for multi-entry SDKs to avoid weird chunking
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"], // Crucial: don't bundle React into your SDK
  outDir: "dist",
});
