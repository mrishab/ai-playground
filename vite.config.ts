import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ai-playground/',
  plugins: [
    react(),
    istanbul({
      include: ['src/**'],
      exclude: ['node_modules/**', 'src/test/**'],
      extension: ['.js', '.ts', '.tsx', '.jsx'],
      requireEnv: false,
      forceBuildInstrument: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    cors: true,
    allowedHosts: true,
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    strictPort: true,
    cors: true,
    allowedHosts: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    fileParallelism: false,
    testTimeout: 15000,
  }
});
