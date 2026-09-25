import { useState } from 'react';
import { useAuth } from './AuthContext';
import { X, Lock, Mail, User as UserIcon, ShieldCheck, AlertCircle, CheckCircle2, KeyRound, ArrowRight } from 'lucide-react';

export default function AuthModal() {
  const {
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
    simulationNotice,
    setSimulationNotice
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  function resetState() {
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setName('');
    setTokenInput('');
    setNewPassword('');
  }

  function switchMode(mode) {
    resetState();
    setAuthMode(mode);
  }

  // Password complexity check
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordStrong = hasLength && hasUpper && hasLower && hasNumber;

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      resetState();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!isPasswordStrong) {
      setError('Password does not meet the minimum security requirements.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await register(email, password, name);
      setSuccess('Registration successful! Please verify your email below.');
      if (res.simulationVerificationToken) {
        setTokenInput(res.simulationVerificationToken);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setSuccess(res.message);
      if (res.simulationResetToken) {
        setTokenInput(res.simulationResetToken);
        setAuthMode('reset');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(tokenInput, newPassword);
      setSuccess('Password updated! You can now log in.');
      setTimeout(() => switchMode('login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleQuickVerify(tok) {
    setError('');
    try {
      await verifyEmail(tok);
      setSuccess('Email verified successfully!');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="auth-card" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={() => setAuthModalOpen(false)} aria-label="Close">
          <X size={20} />
        </button>

        <div className="auth-badge">
          <ShieldCheck size={16} />
          <span>Security Hardened · OWASP Standards</span>
        </div>

        {authMode === 'login' && (
          <div>
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Sign in to your secure account</p>

            {error && (
              <div className="auth-alert error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="auth-form">
              <label>
                <span>Email Address</span>
                <div className="auth-input-wrapper">
                  <Mail size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    autoComplete="email"
                  />
                </div>
              </label>

              <label>
                <div className="auth-label-row">
                  <span>Password</span>
                  <button type="button" onClick={() => switchMode('forgot')} className="auth-text-link">
                    Forgot password?
                  </button>
                </div>
                <div className="auth-input-wrapper">
                  <Lock size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </label>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer-text">
              Don't have an account?{' '}
              <button type="button" onClick={() => switchMode('register')} className="auth-text-link">
                Create one
              </button>
            </div>
          </div>
        )}

        {authMode === 'register' && (
          <div>
            <h2 className="auth-title">Create an Account</h2>
            <p className="auth-subtitle">Encrypted password storage & verified access</p>

            {error && (
              <div className="auth-alert error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="auth-alert success">
                <CheckCircle2 size={18} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="auth-form">
              <label>
                <span>Full Name</span>
                <div className="auth-input-wrapper">
                  <UserIcon size={16} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Morgan"
                  />
                </div>
              </label>

              <label>
                <span>Email Address</span>
                <div className="auth-input-wrapper">
                  <Mail size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    autoComplete="email"
                  />
                </div>
              </label>

              <label>
                <span>Master Password</span>
                <div className="auth-input-wrapper">
                  <Lock size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 chars, uppercase, number"
                    autoComplete="new-password"
                  />
                </div>
              </label>

              {/* Password strength checklist */}
              <div className="auth-checklist">
                <div className={hasLength ? 'check pass' : 'check'}>
                  <span>{hasLength ? '✓' : '•'}</span> 8+ characters
                </div>
                <div className={hasUpper ? 'check pass' : 'check'}>
                  <span>{hasUpper ? '✓' : '•'}</span> 1 uppercase
                </div>
                <div className={hasLower ? 'check pass' : 'check'}>
                  <span>{hasLower ? '✓' : '•'}</span> 1 lowercase
                </div>
                <div className={hasNumber ? 'check pass' : 'check'}>
                  <span>{hasNumber ? '✓' : '•'}</span> 1 number
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading || !isPasswordStrong}>
                {loading ? 'Securing Account...' : 'Register Securely'}
              </button>
            </form>

            {simulationNotice && simulationNotice.type === 'verification' && (
              <div className="simulation-box">
                <div className="simulation-title">
                  <Mail size={15} /> <b>Email Verification Simulator</b>
                </div>
                <p>In production, an activation link is sent to <code>{simulationNotice.email}</code>. Token hash is verified on backend (24h TTL).</p>
                <button
                  type="button"
                  className="auth-sim-btn"
                  onClick={() => handleQuickVerify(simulationNotice.token)}
                >
                  Simulate Email Click: Verify Now <ArrowRight size={14} />
                </button>
              </div>
            )}

            <div className="auth-footer-text">
              Already have an account?{' '}
              <button type="button" onClick={() => switchMode('login')} className="auth-text-link">
                Sign In
              </button>
            </div>
          </div>
        )}

        {authMode === 'forgot' && (
          <div>
            <h2 className="auth-title">Reset Password</h2>
            <p className="auth-subtitle">Generates a single-use token with a 15-minute expiration</p>

            {error && (
              <div className="auth-alert error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="auth-alert success">
                <CheckCircle2 size={18} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="auth-form">
              <label>
                <span>Account Email</span>
                <div className="auth-input-wrapper">
                  <Mail size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                  />
                </div>
              </label>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Generating Token...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="auth-footer-text">
              Remember your password?{' '}
              <button type="button" onClick={() => switchMode('login')} className="auth-text-link">
                Back to Sign In
              </button>
            </div>
          </div>
        )}

        {authMode === 'reset' && (
          <div>
            <h2 className="auth-title">Set New Password</h2>
            <p className="auth-subtitle">15-minute token TTL & session invalidation</p>

            {error && (
              <div className="auth-alert error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="auth-alert success">
                <CheckCircle2 size={18} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="auth-form">
              <label>
                <span>Reset Token</span>
                <div className="auth-input-wrapper">
                  <KeyRound size={16} />
                  <input
                    type="text"
                    required
                    value={tokenInput}
                    onChange={e => setTokenInput(e.target.value)}
                    placeholder="32-byte cryptographic token"
                  />
                </div>
              </label>

              <label>
                <span>New Secure Password</span>
                <div className="auth-input-wrapper">
                  <Lock size={16} />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters..."
                  />
                </div>
              </label>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>

            <div className="auth-footer-text">
              <button type="button" onClick={() => switchMode('login')} className="auth-text-link">
                Cancel & Return to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
