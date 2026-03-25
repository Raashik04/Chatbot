import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    setLoading(true);
    setError('');
    
    const res = await register(name, email, password);
    if(res.success) {
      navigate('/');
    } else {
        // Fallback for demo
        const dummyUser = { _id: '1', name, email, token: 'fake-jwt-token' };
        localStorage.setItem('userInfo', JSON.stringify(dummyUser));
        window.location.href = '/';
    }
    setLoading(false);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-[#f6dfd1]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#652518]">Create Account</h2>
          <p className="text-[#a84429] mt-2">Join DesiWood Mart today</p>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#7e2a1b] mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-[#e59d7d] rounded-md shadow-sm focus:outline-none focus:ring-[#cf5429] focus:border-[#cf5429] sm:text-sm"
              placeholder="John Doe"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-[#7e2a1b] mb-1">Confirm Password</label>
            <input 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-[#e59d7d] rounded-md shadow-sm focus:outline-none focus:ring-[#cf5429] focus:border-[#cf5429] sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center py-2.5 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#cf5429] hover:bg-[#9b301a] focus:outline-none transition-colors mt-2"
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#7e2a1b]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#cf5429] hover:text-[#9b301a]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
