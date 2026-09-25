import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory sessions and rate limiting store
const sessions = new Map(); // sessionId -> { userId, expiresAt }
const loginAttempts = new Map(); // ip/key -> { count, firstAttemptAt, lockedUntil }

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 5;
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const RESET_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes
const VERIFY_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Helper to load users safely
function loadUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('[AuthService] Error reading users file:', err);
    return [];
  }
}

// Helper to save users safely
function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('[AuthService] Error writing users file:', err);
  }
}

// Secure password hashing with scrypt and cryptographically random salt
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

// Constant-time password verification to prevent timing attacks
export function verifyPassword(password, storedHash) {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

// Hash tokens before storing them in DB (defense-in-depth against DB leak)
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// Check rate limit for an identifier (IP or email)
export function checkRateLimit(key) {
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) return { allowed: true };

  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      allowed: false,
      error: `Too many failed attempts. Account locked. Try again in ${Math.ceil(remainingSeconds / 60)} minutes.`
    };
  }

  // If window expired, reset
  if (now - record.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
    loginAttempts.delete(key);
    return { allowed: true };
  }

  return { allowed: true };
}

// Record failed login attempt
export function recordFailedAttempt(key) {
  const now = Date.now();
  const record = loginAttempts.get(key) || { count: 0, firstAttemptAt: now };

  if (now - record.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.firstAttemptAt = now;
    record.lockedUntil = null;
  } else {
    record.count += 1;
  }

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + RATE_LIMIT_WINDOW_MS;
  }

  loginAttempts.set(key, record);
  return record;
}

// Reset rate limiter on successful login
export function resetRateLimit(key) {
  loginAttempts.delete(key);
}

// Create a secure session with strict expiration
export function createSession(userId) {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + SESSION_TTL_MS;
  sessions.set(sessionId, { userId, expiresAt });
  return { sessionId, expiresAt };
}

// Get and validate active session
export function getSession(sessionId) {
  if (!sessionId) return null;
  const session = sessions.get(sessionId);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

// Destroy session on logout
export function destroySession(sessionId) {
  if (sessionId) {
    sessions.delete(sessionId);
  }
}

// Invalidate all sessions for a specific user (used after password reset)
export function invalidateUserSessions(userId) {
  for (const [sId, sess] of sessions.entries()) {
    if (sess.userId === userId) {
      sessions.delete(sId);
    }
  }
}

// Register user
export function registerUser({ email, password, name }) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Basic email syntax validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  // Password complexity policy: at least 8 chars, 1 uppercase, 1 lowercase, 1 number
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, and a number');
  }

  const users = loadUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some(u => u.email === normalizedEmail)) {
    throw new Error('An account with this email already exists');
  }

  // Generate cryptographically random verification token
  const rawVerificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenHash = hashToken(rawVerificationToken);
  const verificationExpires = Date.now() + VERIFY_TOKEN_TTL_MS;

  const newUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    name: (name || normalizedEmail.split('@')[0]).trim(),
    passwordHash: hashPassword(password),
    isVerified: false,
    verificationTokenHash,
    verificationExpires,
    resetTokenHash: null,
    resetExpires: null,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  return {
    user: sanitizeUser(newUser),
    // For demo / simulation purposes, we provide the raw token so user can click verify
    simulationVerificationToken: rawVerificationToken
  };
}

// Login user
export function loginUser({ email, password, clientIp }) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const rateLimitKey = `${clientIp}_${normalizedEmail}`;

  // Check rate limit
  const rateCheck = checkRateLimit(rateLimitKey);
  if (!rateCheck.allowed) {
    throw new Error(rateCheck.error);
  }

  const users = loadUsers();
  const user = users.find(u => u.email === normalizedEmail);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    const attempt = recordFailedAttempt(rateLimitKey);
    const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - attempt.count);
    if (attemptsLeft === 0) {
      throw new Error('Too many failed attempts. Account locked for 15 minutes.');
    }
    throw new Error(`Invalid email or password. ${attemptsLeft} attempt(s) remaining before lockout.`);
  }

  // Enforce email verification
  if (user.isVerified === false) {
    throw new Error('Please verify your email address before logging in.');
  }

  // Clear rate limit on successful authentication
  resetRateLimit(rateLimitKey);

  // Create session
  const { sessionId, expiresAt } = createSession(user.id);

  return {
    user: sanitizeUser(user),
    sessionId,
    expiresAt
  };
}

// Verify email with token
export function verifyEmailToken(rawToken) {
  if (!rawToken) {
    throw new Error('Verification token is required');
  }

  const tokenHash = hashToken(rawToken);
  const users = loadUsers();
  const user = users.find(u => u.verificationTokenHash === tokenHash);

  if (!user) {
    throw new Error('Invalid or expired verification token');
  }

  if (Date.now() > user.verificationExpires) {
    throw new Error('Verification token has expired. Please request a new one.');
  }

  // Mark verified and clear token
  user.isVerified = true;
  user.verificationTokenHash = null;
  user.verificationExpires = null;
  saveUsers(users);

  return sanitizeUser(user);
}

// Request password reset
export function requestPasswordReset(email) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const users = loadUsers();
  const user = users.find(u => u.email === normalizedEmail);

  // OWASP recommendation: do not leak whether an account exists
  if (!user) {
    return {
      message: 'If an account with that email exists, a password reset link has been sent.',
      simulationResetToken: null
    };
  }

  const rawResetToken = crypto.randomBytes(32).toString('hex');
  user.resetTokenHash = hashToken(rawResetToken);
  user.resetExpires = Date.now() + RESET_TOKEN_TTL_MS;
  saveUsers(users);

  return {
    message: 'If an account with that email exists, a password reset link has been sent.',
    simulationResetToken: rawResetToken
  };
}

// Reset password using token
export function resetPasswordWithToken({ rawToken, newPassword }) {
  if (!rawToken) {
    throw new Error('Reset token is required');
  }

  if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
    throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, and a number');
  }

  const tokenHash = hashToken(rawToken);
  const users = loadUsers();
  const user = users.find(u => u.resetTokenHash === tokenHash);

  if (!user) {
    throw new Error('Invalid or expired password reset token');
  }

  if (Date.now() > user.resetExpires) {
    throw new Error('Password reset token has expired (15 minute limit). Please request a new one.');
  }

  // Update password and invalidate all sessions for this user
  user.passwordHash = hashPassword(newPassword);
  user.resetTokenHash = null;
  user.resetExpires = null;
  saveUsers(users);

  invalidateUserSessions(user.id);

  return { success: true, message: 'Password has been reset successfully. Please log in with your new password.' };
}

// Find user by ID and sanitize
export function getUserById(userId) {
  const users = loadUsers();
  const user = users.find(u => u.id === userId);
  return user ? sanitizeUser(user) : null;
}

// Sanitize user object: NEVER expose passwordHash, salts, reset tokens or internal hashes to frontend
export function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isVerified: user.isVerified,
    createdAt: user.createdAt
  };
}
