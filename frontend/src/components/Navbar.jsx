import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'; // <-- Import the vault

const Navbar = () => {
  // Extract the token and logout function
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 cursor-pointer">
            <span className="text-2xl font-light text-dark tracking-wide">
              Travel<span className="font-bold text-gold">Booking</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            <Link to="/" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Home</Link>
            <Link to="/destinations" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Destinations</Link>
            <Link to="/experiences" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Experiences</Link>
          </div>

          {/* Conditional User Actions */}
          <div className="hidden md:flex items-center">
            {token ? (
              // WHAT LOGGED-IN USERS SEE
              <>
                {/* <-- Added Admin Panel Link Here --> */}
                <Link to="/admin" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider mr-6 font-medium">
                  Admin Panel
                </Link>
                <Link to="/mybookings" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider mr-6 font-medium">
                  My Bookings
                </Link>
                <button onClick={logout} className="border border-dark text-dark px-8 py-2 rounded-full hover:bg-dark hover:text-white transition duration-300 tracking-wide text-sm font-medium shadow-sm">
                  Logout
                </button>
              </>
            ) : (
              // WHAT GUESTS SEE
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

        </div>
      </div>
    </nav>
  );
};

export default Navbar;