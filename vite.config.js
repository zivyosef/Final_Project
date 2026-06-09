import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'HomePage.html'),
        profile: resolve(__dirname, 'profile.html'),
        writing: resolve(__dirname, 'writing.html'),
        search: resolve(__dirname, 'search.html'),
        about: resolve(__dirname, 'about.html')
      }
    }
  }
});