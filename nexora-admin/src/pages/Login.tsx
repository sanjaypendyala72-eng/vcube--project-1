import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import api from '../lib/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Connecting to localhost:8000/nexora/auth/login or similar endpoint
      const response = await api.post('/auth/login', { email, password });
      
      // Handle success (store token if not using httpOnly cookies, though cookies are preferred)
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Ensure the server at localhost:8000/nexora is running.');
    }
  };

  return (
    <div className="min-h-screen bg-nexora-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-widest">
          NEXORA <span className="text-nexora-gold">ADMIN</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to access the control panel
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-nexora-darkest py-8 px-4 shadow-xl border border-gray-800 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-nexora-dark text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-nexora-gold focus:border-nexora-gold sm:text-sm transition-colors"
                  placeholder="admin@nexora.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-nexora-dark text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-nexora-gold focus:border-nexora-gold sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-nexora-gold focus:ring-nexora-gold border-gray-700 rounded bg-nexora-dark"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember device
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-nexora-gold hover:bg-nexora-goldLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nexora-dark focus:ring-nexora-gold transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
