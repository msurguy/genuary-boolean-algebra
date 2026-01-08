import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  base: "/genuary-boolean-algebra/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});