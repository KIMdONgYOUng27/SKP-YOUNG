import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { sites } from '@openai/sites-vite-plugin';

export default defineConfig({
  plugins: [sites()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        report: resolve(__dirname, 'report.html'),
        contents: resolve(__dirname, 'contents.html'),
        sns: resolve(__dirname, 'sns.html'),
        finalProject: resolve(__dirname, 'final-project.html'),
      },
    },
  },
});
