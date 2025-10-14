// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

const isProduction = process.env.NODE_ENV === 'production';

const extra = isProduction
  ? {
    vite: {
      plugins: [tailwindcss()],
      ssr: {
        noExternal: true,
      },
    },
  }
  : {
    vite: {
      plugins: [tailwindcss()],
    }
  };

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  adapter: node({
    mode: 'middleware'
  }),
  ...extra
});