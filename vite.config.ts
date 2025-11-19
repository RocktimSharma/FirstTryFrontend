import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: "dist"
    },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
      '@types': path.resolve(__dirname, './src/types'),
      '@graphql': path.resolve(__dirname, './src/graphql'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@app': path.resolve(__dirname, './src/app'),
    },
  },
    server: {
        host: "0.0.0.0",
        port: 5173,
        allowedHosts: [
            'localhost',
            '127.0.0.1',
            'b12dbc45e0d2.ngrok-free.app', // ✅ wildcard for all ngrok subdomains
        ],
    },
})
