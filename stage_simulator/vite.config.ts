import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['muso-dev-pc-1.local'],
    fs: {
      // Allow serving files from symlinked directories
      allow: ['..'],
    },
    host: true, // Allow access from the network
  },
  assetsInclude: ['**/*.STL', '**/*.stl', '**/*.urdf'],
});
