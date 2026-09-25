import http from 'node:http';
import { handleAuthRequest } from './authMiddleware.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // Safe CORS handling: Only allow trusted origins or same-origin
  const origin = req.headers.origin;
  const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8000',
    process.env.FRONTEND_URL
  ].filter(Boolean);

  if (origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.onrender.com'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  await handleAuthRequest(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  });
});

server.listen(PORT, () => {
  console.log(`[Production Auth Server] Running on http://localhost:${PORT}`);
});
