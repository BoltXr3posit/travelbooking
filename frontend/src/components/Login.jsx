import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
// 1. ADDED THE MISSING IMPORT HERE
import { useToast } from '../context/ToastContext'; 
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Extract our new googleSignIn function
  const { login, googleSignIn } = useContext(AuthContext);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-light text-dark tracking-wide">
          Welcome <span className="font-bold text-gold">Back</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 uppercase tracking-widest">
          Access your luxury portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-50 sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Email Address</label>
              <div className="mt-1">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition bg-gray-50" placeholder="vip@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Password</label>
              <div className="mt-1">
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition bg-gray-50" placeholder="••••••••" />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full bg-dark text-white py-4 rounded-full font-bold uppercase tracking-[0.15em] text-sm hover:bg-gold transition duration-300 shadow-lg hover:shadow-xl mt-4">
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-400 uppercase tracking-widest text-xs">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              {/* 2. FIXED THE ONSUCCESS PROP SYNTAX HERE */}
              <GoogleLogin 
                onSuccess={(credentialResponse) => {
                  // Pass the token Google gives us to our Node engine!
                  googleSignIn(credentialResponse.credential);
                }}
                onError={() => {
                  showToast('Google login popup was closed or failed.', 'error');
                }}
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-gold hover:text-dark transition duration-300">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;