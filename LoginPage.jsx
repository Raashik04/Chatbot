import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate call since backend might not be running in testing
    const res = await login(email, password);
    if(res.success) {
      navigate('/');
    } else {
      // For demo fallback (if backend is off)
      if (email === 'demo@user.com' && password === '123456') {
         const dummyUser = { _id: '1', name: 'Demo User', email, token: 'fake-jwt-token' };
         localStorage.setItem('userInfo', JSON.stringify(dummyUser));
         window.location.href = '/';
      } else {
         setError(res.message + ' (Hint: use demo@user.com / 123456 if backend is off)');
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-[#f6dfd1]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#652518]">Welcome Back</h2>
          <p className="text-[#a84429] mt-2">Sign in to your DesiWood Mart account</p>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#7e2a1b] mb-1">Email address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-[#e59d7d] rounded-md shadow-sm focus:outline-none focus:ring-[#cf5429] focus:border-[#cf5429] sm:text-sm"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7e2a1b] mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-[#e59d7d] rounded-md shadow-sm focus:outline-none focus:ring-[#cf5429] focus:border-[#cf5429] sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center py-2.5 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#cf5429] hover:bg-[#9b301a] focus:outline-none transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#7e2a1b]">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#cf5429] hover:text-[#9b301a]">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
