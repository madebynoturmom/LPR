
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';


const config = {
  preprocess: mdsvex(),
  kit: {
    adapter: adapter(),
    csrf: { trustedOrigins: ['*'] }
  },
  extensions: ['.svelte', '.svx']
};

export default config;