import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    globals: true,
    setupFiles: './vitest-setup-client.ts',
  },
  resolve: {
    extensions: ['.js', '.ts', '.svelte']
  }
});
