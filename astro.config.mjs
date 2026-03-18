import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const repository = process.env.GITHUB_REPOSITORY;
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repositoryName = repository?.split('/')[1];
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && repositoryName;

export default defineConfig({
  integrations: [react()],
  site: isGitHubPagesBuild && repositoryOwner ? `https://${repositoryOwner}.github.io` : undefined,
  base: isGitHubPagesBuild ? `/${repositoryName}/` : '/',
  trailingSlash: 'always',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: [fileURLToPath(new URL('../experiments/src/styles', import.meta.url))],
        },
      },
    },
    resolve: {
      alias: {
        '@tokens': fileURLToPath(new URL('../experiments/src/styles/branding', import.meta.url)),
      },
    },
  },
});
