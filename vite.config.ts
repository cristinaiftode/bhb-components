import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` is set to '/bhb-components/' so the built showcase works when served
// from https://cristinaiftode.github.io/bhb-components/. Locally (`npm run dev`)
// Vite uses '/' regardless, so this only affects production builds.
export default defineConfig({
  plugins: [react()],
  base: '/bhb-components/',
});
