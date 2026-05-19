import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { token, userRole, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex-shrink-0 cursor-pointer">
            <span className="text-2xl font-light text-dark tracking-wide">
              Travel<span className="font-bold text-gold">Booking</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
            <Link to="/" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Home</Link>
            <Link to="/destinations" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Apartments</Link>
            <Link to="/experiences" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Experiences</Link>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center">
            {token ? (
              <>
                {userRole === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider mr-6 font-medium">
                    Admin Panel
                  </Link>
                )}
                <Link to="/mybookings" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider mr-6 font-medium">
                  My Bookings
                </Link>
                <button onClick={logout} className="border border-dark text-dark px-8 py-2 rounded-full hover:bg-dark hover:text-white transition duration-300 tracking-wide text-sm font-medium shadow-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider mr-4">
                  Sign In
                </Link>
                <Link to="/register" className="bg-dark text-white px-8 py-2.5 rounded-full hover:bg-gold transition duration-300 tracking-wide text-sm font-medium shadow-md hover:shadow-lg">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-dark focus:outline-none">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen border-t border-gray-100' : 'max-h-0'}`}>
        <div className="px-6 pt-4 pb-8 space-y-4 bg-white shadow-xl">
          <Link to="/" onClick={closeMenu} className="block text-gray-600 py-2 text-base uppercase tracking-widest">Home</Link>
          <Link to="/destinations" onClick={closeMenu} className="block text-gray-600 py-2 text-base uppercase tracking-widest">Apartments</Link>
          <Link to="/experiences" onClick={closeMenu} className="block text-gray-600 py-2 text-base uppercase tracking-widest">Experiences</Link>
          
          <div className="pt-4 border-t border-gray-50">
            {token ? (
              <>
                {userRole === 'admin' && (
                  <Link to="/admin" onClick={closeMenu} className="block text-gold py-2 text-base font-bold uppercase tracking-widest">Admin Panel</Link>
                )}
                <Link to="/mybookings" onClick={closeMenu} className="block text-gray-600 py-2 text-base uppercase tracking-widest">My Bookings</Link>
                <button 
                  onClick={() => { logout(); closeMenu(); }} 
                  className="w-full mt-4 bg-dark text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block text-gray-600 py-2 text-base uppercase tracking-widest">Sign In</Link>
                <Link to="/register" onClick={closeMenu} className="block mt-4 text-center bg-dark text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;