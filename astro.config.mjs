// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://omnifleet.pages.dev',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
