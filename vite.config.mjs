import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [
    react(),
    {
      name: "sponsor-share-image",
      transformIndexHtml(html) {
        const { VITE_PUBLIC_SITE_URL: siteUrl } = loadEnv(mode, process.cwd());
        if (!siteUrl) return html;
        const imageUrl = new URL("/brand/share.jpg", siteUrl).href;
        return html.replace('content="/brand/share.jpg"', `content="${imageUrl}"`);
      },
    },
  ],
}));
