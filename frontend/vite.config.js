import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://todolist-app-d0wu.onrender.com",
      "/uploads/": "https://todolist-app-d0wu.onrender.com",
    },
  },
});
