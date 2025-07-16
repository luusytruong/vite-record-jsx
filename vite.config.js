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
      input: {
        // Thêm điểm vào cho file HTML chính của ứng dụng
        // Giả sử index.html nằm ở thư mục gốc của dự án
        main: resolve(__dirname, "index.html"),
        // Hoặc nếu nó nằm trong thư mục src:
        // main: resolve(__dirname, "src/index.html"),

        // Giữ lại điểm vào cho content script nếu đây là một phần của tiện ích mở rộng
        content: resolve(__dirname, "src/content/index.js"),
      },
      output: {
        entryFileNames: ({ name }) => {
          if (name === "content") return "content/injected.js";
          // Các file JS khác (ví dụ: từ main.html) sẽ vào thư mục assets
          return `assets/[name]-[hash].js`;
        },
        // Bạn cũng có thể điều chỉnh assetFileNames nếu có CSS/ảnh đi kèm
        // assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
    emptyOutDir: true, // Giữ lại để không xóa các file khác trong dist
  },
});
