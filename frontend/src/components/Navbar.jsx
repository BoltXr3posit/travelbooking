const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 cursor-pointer">
            <span className="text-2xl font-light text-dark tracking-wide">
              Travel<span className="font-bold text-gold">Booking</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-10 items-center">
            <a href="#" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Home</a>
            <a href="#" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Destinations</a>
            <a href="#" className="text-gray-600 hover:text-gold transition duration-300 text-sm uppercase tracking-wider">Experiences</a>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex">
            <button className="bg-dark text-white px-8 py-2.5 rounded-full hover:bg-gold transition duration-300 tracking-wide text-sm font-medium shadow-md hover:shadow-lg">
              Sign In
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;