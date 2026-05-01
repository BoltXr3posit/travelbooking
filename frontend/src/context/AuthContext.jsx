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
      const response = await fetch('http://localhost:5000/api/auth/login', {
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

  // The function to revoke access
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Provide these tools to the rest of the application
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;