import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  base: "/4.2.2./",
  test: {
    globals: true,
    environment: "jsdom",
  },
});
