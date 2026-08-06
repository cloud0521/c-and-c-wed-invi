import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react';
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-dom')) return 'motion';
          if (id.includes('node_modules/@supabase')) return 'supabase';
          return undefined;
        },
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'], // Forces Framer Motion to use your main React package
  },
})
