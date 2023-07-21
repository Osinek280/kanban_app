import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const apiUrls = {
  production: "https://messenger-api-vcnc.onrender.com",
  development: "http://localhost:8000"
};

const processShim = {
  env: {
    NODE_ENV: environment,
    API_URL: apiUrls[environment]
  }
};

export default defineConfig({
  plugins: [react()],
  define: {
    'process': JSON.stringify(processShim)
  }
})
