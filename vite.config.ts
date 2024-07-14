/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "path";
import { defineConfig } from "vite";
import createSvgSpritePlugin from "vite-plugin-svg-spriter";

import packageJSON from "./package.json";

const SVG_FOLDER_PATH = path.resolve(__dirname, "src", "assets");

const date = new Date();
const formatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
const formattedDate = formatter.format(date);

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    react(),
    createSvgSpritePlugin({
      svgFolder: SVG_FOLDER_PATH,
      transformIndexHtmlTag: {
        injectTo: "body",
      },
    }),
  ],
  server: {
    port: 4200,
    host: true,
  },
  define: {
    __LAST_BUILD_AT__: JSON.stringify(formattedDate),
    __APP_VERSION__: JSON.stringify(packageJSON.version),
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@async-actions": path.resolve(__dirname, "./src/store/asyncActions"),
      "@consts": path.resolve(__dirname, "./src/consts"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@containers": path.resolve(__dirname, "./src/containers"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@selectors": path.resolve(__dirname, "./src/store/slices/selectors"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@slices": path.resolve(__dirname, "./src/store/slices"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@style": path.resolve(__dirname, "./src/style"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      src: path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("/react/") || id.includes("react-dom")) {
            return "react";
          }
          if (id.includes("react-router")) {
            return "react-router";
          }
          if (id.includes("firebase")) {
            return "firebase";
          }
        },
      },
    },
  },
});
