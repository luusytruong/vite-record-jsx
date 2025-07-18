import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/dist",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      /**
       * Thêm điểm vào cho file HTML chính của ứng dụng
       * Giả sử index.html nằm ở thư mục gốc của dự án
       * Hoặc nếu nó nằm trong thư mục src:
       * main: resolve(__dirname, "src/index.html"),
       * Giữ lại điểm vào cho content script nếu đây là một phần của tiện ích mở rộng
       */
      input: {
        main: resolve(__dirname, "index.html"),
        content: resolve(__dirname, "src/content/index.js"),
      },
      output: {
        /**
         * Các file JS khác (ví dụ: từ main.html) sẽ vào thư mục assets
         * Bạn cũng có thể điều chỉnh assetFileNames nếu có CSS/ảnh đi kèm
         * Ví dụ: assetFileNames: `assets/[name]-[hash].[ext]`
         */
        entryFileNames: ({ name }) => {
          if (name === "content") return "content/injected.js";
          return `assets/[name]-[hash].js`;
        },
      },
    },
    emptyOutDir: true,
  },
});
