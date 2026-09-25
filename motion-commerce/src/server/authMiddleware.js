import url from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import * as authService from './authService.js';

const candidateLogoPaths = [
  path.join(process.cwd(), '..', 'ChatGPT Image Sep 24, 2026, 11_32_11 AM (1).png'),
  path.join(process.cwd(), 'ChatGPT Image Sep 24, 2026, 11_32_11 AM (1).png'),
  path.join(process.cwd(), 'public', 'custom-logo.png')
];

// Parse cookies from Cookie header
function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (!rc) return list;

  rc.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}

// Read JSON body from stream
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Prevent payload flood (max 100KB)
      if (body.length > 100 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', err => reject(err));
  });
}

// Send JSON response helper
function sendJson(res, statusCode, data, headers = {}) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  for (const [k, v] of Object.entries(headers)) {
    res.setHeader(k, v);
  }
  res.end(JSON.stringify(data));
}

// Auth API Router for Vite connect middleware or Express
export async function handleAuthRequest(req, res, next) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/nexora-logo.jpg') {
    try {
      const validPath = candidateLogoPaths.find(p => fs.existsSync(p));
      if (validPath) {
        const imgBuffer = fs.readFileSync(validPath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.end(imgBuffer);
        return;
      }
    } catch (e) {
      console.error('Error serving logo:', e);
    }
  }

  if (!pathname.startsWith('/api/auth')) {
    return next();
  }

  const method = req.method;
  const xForwardedFor = req.headers['x-forwarded-for'];
  const clientIp = (typeof xForwardedFor === 'string' ? xForwardedFor.split(',')[0].trim() : null) || req.socket?.remoteAddress || '127.0.0.1';
  const cookies = parseCookies(req);
  const currentSessionId = cookies.sessionId;

  try {
    // 1. GET /api/auth/me - Check current session
    if (pathname === '/api/auth/me' && method === 'GET') {
      const session = authService.getSession(currentSessionId);
      if (!session) {
        return sendJson(res, 401, { authenticated: false, user: null });
      }

      const user = authService.getUserById(session.userId);
      if (!user) {
        authService.destroySession(currentSessionId);
        return sendJson(res, 401, { authenticated: false, user: null });
      }

      return sendJson(res, 200, { authenticated: true, user });
    }

    // 2. POST /api/auth/register - Register new account
    if (pathname === '/api/auth/register' && method === 'POST') {
      const body = await readJsonBody(req);
      const result = authService.registerUser(body);
      return sendJson(res, 201, {
        success: true,
        message: 'Account registered. Please verify your email.',
        user: result.user,
        simulationVerificationToken: result.simulationVerificationToken
      });
    }

    // 3. POST /api/auth/login - Authenticate with rate limiting & secure HttpOnly cookie
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await readJsonBody(req);
      const result = authService.loginUser({
        email: body.email,
        password: body.password,
        clientIp
      });

      // Secure cookie: HttpOnly prevents JavaScript/XSS access; SameSite=Lax protects CSRF; Max-Age enforces TTL
      const isProd = process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https';
      const cookieHeader = `sessionId=${result.sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=7200${isProd ? '; Secure' : ''}`;

      return sendJson(res, 200, {
        success: true,
        user: result.user
      }, {
        'Set-Cookie': cookieHeader
      });
    }

    // 4. POST /api/auth/logout - Terminate session
    if (pathname === '/api/auth/logout' && method === 'POST') {
      authService.destroySession(currentSessionId);
      const clearCookie = `sessionId=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;

      return sendJson(res, 200, {
        success: true,
        message: 'Logged out successfully'
      }, {
        'Set-Cookie': clearCookie
      });
    }

    // 5. GET /api/auth/verify-email - Verify email with single-use token
    if (pathname === '/api/auth/verify-email' && method === 'GET') {
      const token = parsedUrl.query.token;
      const user = authService.verifyEmailToken(token);
      return sendJson(res, 200, {
        success: true,
        message: 'Email successfully verified!',
        user
      });
    }

    // 6. POST /api/auth/forgot-password - Generate password reset token
    if (pathname === '/api/auth/forgot-password' && method === 'POST') {
      const resetRateKey = `reset_${clientIp}`;
      const rateCheck = authService.checkRateLimit(resetRateKey);
      if (!rateCheck.allowed) {
        return sendJson(res, 429, { error: rateCheck.error });
      }
      authService.recordFailedAttempt(resetRateKey);

      const body = await readJsonBody(req);
      const result = authService.requestPasswordReset(body.email);
      return sendJson(res, 200, result);
    }

    // 7. POST /api/auth/reset-password - Reset password using valid unexpired token
    if (pathname === '/api/auth/reset-password' && method === 'POST') {
      const body = await readJsonBody(req);
      const result = authService.resetPasswordWithToken({
        rawToken: body.token,
        newPassword: body.newPassword
      });
      return sendJson(res, 200, result);
    }

    // Unmatched auth route
    return sendJson(res, 404, { error: 'Not found' });
  } catch (err) {
    console.error(`[Auth API Error] ${method} ${pathname}:`, err.message);
    const statusCode = err.message.includes('locked') || err.message.includes('Too many')
      ? 429
      : err.message.includes('Invalid') || err.message.includes('required') || err.message.includes('expired') || err.message.includes('already exists')
      ? 400
      : 500;

    return sendJson(res, statusCode, { error: err.message });
  }
}
