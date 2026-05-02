import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext'; 
import { AuthProvider } from './context/AuthContext';
// <-- 1. Import the Google Provider
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
      <GoogleOAuthProvider clientId="{import.meta.env.VITE_GOOGLE_CLIENT_ID}">
        <ToastProvider>
          <AuthProvider>
            <App/>
          </AuthProvider>
        </ToastProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);