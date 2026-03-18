import { visualizer } from 'rollup-plugin-visualizer';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBaseUrl = env.VITE_API_BASE_URL;

  return {
    plugins: [
      devtools(),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteReact(),
      svgr(),
      visualizer(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/')
            ) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/@tanstack/')) {
              return 'vendor-tanstack';
            }
            if (id.includes('node_modules/@amplitude/')) {
              return 'vendor-amplitude';
            }
            if (
              id.includes('node_modules/i18next') ||
              id.includes('node_modules/react-i18next')
            ) {
              return 'vendor-i18n';
            }
            if (
              id.includes('node_modules/lottie-react') ||
              id.includes('node_modules/lottie-web')
            ) {
              return 'vendor-lottie';
            }
            if (
              id.includes('node_modules/react-datetime-picker') ||
              id.includes('node_modules/react-calendar') ||
              id.includes('node_modules/react-clock')
            ) {
              return 'vendor-datetime';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('node_modules/zod')) {
              return 'vendor-zod';
            }
            if (
              id.includes('node_modules/tinymce') ||
              id.includes('node_modules/@tinymce')
            ) {
              return 'vendor-tinymce';
            }
          },
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.removeHeader('origin');
              proxyReq.removeHeader('referer');
            });
            proxy.on('proxyRes', (proxyRes) => {
              const cookies = proxyRes.headers['set-cookie'];
              if (cookies) {
                proxyRes.headers['set-cookie'] = cookies.map((cookie) => {
                  return cookie
                    .replace(/Secure(; )?/, '')
                    .replace(/HttpOnly(; )?/, '')
                    .replace('Path=', 'Path=/api');
                });
              }
            });
          },
        },
      },
    },
  };
});

export default config;
