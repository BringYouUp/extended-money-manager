import { defineConfig } from 'vite'
import createSvgSpritePlugin from 'vite-plugin-svg-spriter'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from 'autoprefixer'
import packageJSON from './package.json'

const SVG_FOLDER_PATH = path.resolve(__dirname, 'src', 'assets')

const date = new Date();
const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const formattedDate = formatter.format(date);

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    react(),
    createSvgSpritePlugin({
      svgFolder: SVG_FOLDER_PATH,
      transformIndexHtmlTag: {
        injectTo: 'body',
      },
    })
  ],
  server: {
    port: 4200,
    host: true,
  },
  define: {
    __LAST_BUILD_AT__: JSON.stringify(formattedDate),
    __APP_VERSION__: JSON.stringify(packageJSON.version),
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@async-actions': path.resolve(__dirname, './src/store/asyncActions'),
      '@consts': path.resolve(__dirname, './src/consts'),
      '@components': path.resolve(__dirname, './src/components'),
      '@containers': path.resolve(__dirname, './src/containers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/models'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@selectors': path.resolve(__dirname, './src/store/slices/selectors'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@slices': path.resolve(__dirname, './src/store/slices'),
      '@store': path.resolve(__dirname, './src/store'),
      '@style': path.resolve(__dirname, './src/style'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@providers': path.resolve(__dirname, './src/providers'),
      'src': path.resolve(__dirname, './src'),
    }
  }
})
