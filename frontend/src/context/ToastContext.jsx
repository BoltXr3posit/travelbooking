import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type });
    
    // Automatically fade out after 4 seconds
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* The Floating Luxury Toast Component */}
      {toast && (
        <div className="fixed top-28 right-8 z-100 transition-all duration-500 ease-in-out">
          <div className={`flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border ${
            toast.type === 'error' ? 'bg-white/95 border-red-100' : 'bg-dark/95 border-gold/30'
          }`}>
            {toast.type === 'error' ? (
              <span className="flex items-center justify-center w-8 h-8 mr-4 bg-red-50 text-red-500 rounded-full font-bold text-lg">!</span>
            ) : (
              <span className="flex items-center justify-center w-8 h-8 mr-4 bg-gold/10 text-gold rounded-full font-bold text-lg">✓</span>
            )}
            <p className={`text-sm tracking-wide font-medium ${toast.type === 'error' ? 'text-gray-800' : 'text-white'}`}>
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);