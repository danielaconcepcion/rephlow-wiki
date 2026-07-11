import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// Imported directly from its own module (not the "./src/utils" barrel):
// the barrel re-exports getPathMapping, which pulls in pages.ts and the
// full component tree — including a CSS import (Team.css) that esbuild
// can't handle while bundling this Node-context config file.
import { stringToSlug } from "./src/utils/stringToSlug";

// https://vitejs.dev/config/
export default () => {
  const env = loadEnv("dev", process.cwd());
  return defineConfig({
    base: `/${stringToSlug(env.VITE_TEAM_NAME)}/`,
    plugins: [react()],
  });
};
