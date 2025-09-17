
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';


const config = {
  preprocess: mdsvex(),
  kit: {
    adapter: adapter(),
    csrf: { checkOrigin: true }
  },
  extensions: ['.svelte', '.svx']
};

export default config;