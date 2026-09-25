import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleAuthRequest } from './src/server/authMiddleware.js';

function authPlugin() {
  return {
    name: 'secure-auth-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handleAuthRequest(req, res, next);
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), authPlugin()],
  server: {

    port: 5173,
    host: true
  }
});
