import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';
import { staticMain } from './src/content/staticMain';

// Writes the About copy and project summaries into index.html (src/content/staticMain.ts).
const staticContent = (): Plugin => ({
  name: 'static-content',
  transformIndexHtml: (html) => html.replace('<div id="root"></div>', `${staticMain()}\n    <div id="root"></div>`),
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), staticContent()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    include: ['src/**/*.test.{ts,tsx}', 'serverless/**/*.test.{js,mjs}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        'serverless/__tests__/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/main.tsx',
      ],
    },
  },
});
