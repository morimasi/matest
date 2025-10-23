import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const apiKey = process.env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // Vercel'deki environment variable'ı istemci kodunda kullanılabilir hale getir
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  }
})