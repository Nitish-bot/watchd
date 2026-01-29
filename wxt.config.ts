import { defineConfig } from 'wxt'
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  imports: false,
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Watchd',
    permissions: ['storage'],
  },
  vite: () => ({
    plugins: [tailwindcss()],
    define: {
      global: 'globalThis',
      'process.env.NODE_ENV': '"production"',
    },
  }),
})
