import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the vault
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if we already have a token saved from a previous visit
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  // The function to talk to your backend engine
  const login = async (email, password) => {
    try {
      const response = await fetch('http://travelbooking-one.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Save the VIP pass to state and browser memory
        setToken(data.token);
        localStorage.setItem('token', data.token);
        
        // Reroute them to the homepage to book a stay
        navigate('/');
      } else {
        alert(data.message); // Show them why they were rejected
      }
    } catch (error) {
      console.error('Login engine failed:', error);
      alert('Could not connect to the authentication server.');
    }
  };

  // The function to create a new VIP account
  const registerUser = async (name, email, password) => {
    try {
      // NOTE: Make sure this URL matches your live Vercel backend URL!
      const response = await fetch('https://travelbooking-one.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Save the VIP pass and log them in immediately
        setToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.message); // Show them why they were rejected (e.g. Email taken)
      }
    } catch (error) {
      console.error('Registration engine failed:', error);
      alert('Could not connect to the authentication server.');
    }
  };

  // The function to revoke access
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Provide these tools to the rest of the application
  return (
    <AuthContext.Provider value={{ token, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;