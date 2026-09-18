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
        projects: resolve(__dirname, 'projects.html'),
        research: resolve(__dirname, 'research.html'),
        about: resolve(__dirname, 'about.html'),
        idol: resolve(__dirname, 'idol.html'),
        brandImage: resolve(__dirname, 'brand-image.html'),
        idolRoute: resolve(__dirname, 'idol/index.html'),
        brandImageRoute: resolve(__dirname, 'brand-image/index.html'),
        sns: resolve(__dirname, 'sns.html'),
        finalProject: resolve(__dirname, 'final-project.html'),
        tripB: resolve(__dirname, 'trip-b.html'),
        dadaepoCardnews: resolve(__dirname, 'cardnews/dadaepo/index.html'),
      },
    },
  },
});
