import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Permitir el acceso a todos los archivos en la misma carpeta que vite.config.js y connect.js
      allow: [
        __dirname, // Carpeta actual (donde está vite.config.js)
        'c:/users/user/desktop/proyects/react/olimpiadas/server/connect.js' // Ruta específica de connect.js
      ],
    },
  },
});
