import { resolve } from 'node:path';
import { copyFile, mkdir } from 'node:fs/promises';
import { defineConfig } from 'vite';
import { sites } from '@openai/sites-vite-plugin';

export default defineConfig({
  plugins: [
    sites(),
    {
      name: 'copy-classic-site-script',
      apply: 'build',
      async closeBundle() {
        const outputDirectory = resolve(__dirname, 'dist', 'assets', 'js');
        await mkdir(outputDirectory, { recursive: true });
        await copyFile(resolve(__dirname, 'assets', 'js', 'main.js'), resolve(outputDirectory, 'main.js'));
      },
    },
  ],
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
