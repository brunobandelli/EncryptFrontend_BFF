import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/posts': env.VITE_API_URL,
        '/encrypt': env.VITE_API_URL,
        '/decrypt': env.VITE_API_URL,
      },
    },
  }
})
