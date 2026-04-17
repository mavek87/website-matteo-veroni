// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://matteoveroni.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it', 'de', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [sitemap()],
});
