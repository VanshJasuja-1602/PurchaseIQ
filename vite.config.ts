import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/predict': {
        target: 'https://dbc-0907a775-590e.cloud.databricks.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/predict/, '/serving-endpoints/online-shoppers-endpoint/invocations'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        },
      }
    }
  }
})
