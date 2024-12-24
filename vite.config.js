import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/my-apphub/',
  plugins: [react()],
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { resolve } from 'path';
// import { writeFileSync } from 'fs';

// export default defineConfig({
//   base: '/my-apphub/', // Replace with your repository name
//   plugins: [react()],
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       input: resolve(__dirname, 'index.html'),
//     },
//   },
//   // Custom script to copy index.html to 404.html
//   closeBundle: () => {
//     const html = resolve(__dirname, 'dist', 'index.html');
//     const notFoundHtml = resolve(__dirname, 'dist', '404.html');
//     writeFileSync(notFoundHtml, html);
//   },
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: '/my-apphub/', // Replace "my-apphub" with your repository name
//   plugins: [react()],
// });
