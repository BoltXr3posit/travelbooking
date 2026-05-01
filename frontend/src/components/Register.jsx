import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // We will wire this up to your Node.js engine in the next step!
    console.log('Registration attempt:', { name, email, password });
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-light text-dark tracking-wide">
          Become a <span className="font-bold text-gold">Member</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 uppercase tracking-widest">
          Unlock exclusive destinations
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-50 sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition bg-gray-50"
                  placeholder="James Bond"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition bg-gray-50"
                  placeholder="vip@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition bg-gray-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-dark text-white py-4 rounded-full font-bold uppercase tracking-[0.15em] text-sm hover:bg-gold transition duration-300 shadow-lg hover:shadow-xl mt-4"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already a member?{' '}
              <Link to="/login" className="font-medium text-gold hover:text-dark transition duration-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;