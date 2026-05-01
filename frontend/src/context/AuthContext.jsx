import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext'; // <-- 1. Import your custom hook

// Create the vault
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();
  
  // 2. Extract the showToast tool from your new provider
  const { showToast } = useToast(); 

  // The function to talk to your backend engine
  const login = async (email, password) => {
    try {
      const response = await fetch('https://travelbooking-one.vercel.app/api/auth/login', {
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
        
        showToast('Authentication successful.', 'success'); 
        
        // Check for a return ticket, default to homepage if none exists
        const returnUrl = localStorage.getItem('returnTo') || '/';
        localStorage.removeItem('returnTo'); // Shred the ticket after using it
        navigate(returnUrl);
      } else {
        showToast(data.message, 'Currently Looking into an issue, Please try again later.'); // <-- Replaced alert
      }
    } catch (error) {
      console.error('Login engine failed:', error);
      showToast('Could not connect to the authentication server.', 'error'); // <-- Replaced alert
    }
  };

  // The function to create a new VIP account
  const registerUser = async (name, email, password) => {
    try {
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
        
        showToast('VIP Account created successfully.', 'success'); // <-- Success Toast!
        navigate('/');
      } else {
        showToast(data.message, 'error'); // <-- Replaced alert
      }
    } catch (error) {
      console.error('Registration engine failed:', error);
      showToast('Could not connect to the authentication server.', 'error'); // <-- Replaced alert
    }
  };

  // The function to revoke access
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    
    showToast('You have been securely logged out.', 'success'); // <-- Success Toast!
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