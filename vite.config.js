import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  base: "/labs/boolean-algebra/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});