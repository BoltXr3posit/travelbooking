import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  // <-- NEW: Track the user role
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null); 
  const navigate = useNavigate();
  const { showToast } = useToast(); 

  const login = async (email, password) => {
    try {
      const response = await fetch('https://travelbooking-one.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        setUserRole(data.role); // <-- Save role to state
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role); // <-- Save role to browser memory
        
        showToast('Authentication successful.', 'success'); 
        const returnUrl = localStorage.getItem('returnTo') || '/';
        localStorage.removeItem('returnTo'); 
        navigate(returnUrl);
      } else {
        showToast(data.message, 'error'); 
      }
    } catch (error) {
      console.error('Login engine failed:', error);
      showToast('Could not connect to the authentication server.', 'error'); 
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await fetch('https://travelbooking-one.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        setUserRole(data.role); // <-- Save role to state
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role); // <-- Save role to browser memory
        
        showToast('VIP Account created successfully.', 'success'); 
        navigate('/');
      } else {
        showToast(data.message, 'error'); 
      }
    } catch (error) {
      console.error('Registration engine failed:', error);
      showToast('Could not connect to the authentication server.', 'error'); 
    }
  };

  const googleSignIn = async (tokenId) => {
    try {
      const response = await fetch('https://travelbooking-one.vercel.app/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenId }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        setUserRole(data.role); 
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role); 
        
        showToast('Securely authenticated with Google.', 'success'); 
        const returnUrl = localStorage.getItem('returnTo') || '/';
        localStorage.removeItem('returnTo'); 
        navigate(returnUrl);
      } else {
        showToast(data.message || 'Google authentication failed.', 'error'); 
      }
    } catch (error) {
      console.error('Google Auth engine failed:', error);
      showToast('Could not connect to the authentication server.', 'error'); 
    }
  };

  const logout = () => {
    setToken(null);
    setUserRole(null); // <-- Clear role
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); // <-- Clear role memory
    
    showToast('You have been securely logged out.', 'success'); 
    navigate('/login');
  };

  return (
    // <-- Pass userRole down so the rest of the app can see it
    <AuthContext.Provider value={{ token, userRole, login, logout, registerUser, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;