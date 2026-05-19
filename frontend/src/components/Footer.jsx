import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-light tracking-wide block">
              Apartment<span className="font-bold text-gold">Finder</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-light mt-6">
              Curating the world's most exclusive destinations and bespoke experiences for the modern luxury traveler.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-6 text-gold">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300 text-sm uppercase tracking-wider">Home</Link></li>
              <li><Link to="/destinations" className="text-gray-400 hover:text-white transition duration-300 text-sm uppercase tracking-wider">Destinations</Link></li>
              <li><Link to="/experiences" className="text-gray-400 hover:text-white transition duration-300 text-sm uppercase tracking-wider">Experiences</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-6 text-gold">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/login" className="text-gray-400 hover:text-white transition duration-300 text-sm uppercase tracking-wider">Client Portal</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm uppercase tracking-wider">Contact Concierge</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm uppercase tracking-wider">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm uppercase tracking-wider">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-6 text-gold">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4 font-light">Subscribe to receive exclusive access to new properties.</p>
            <form className="flex shadow-lg" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-3 rounded-l-full w-full text-sm focus:outline-none focus:ring-1 focus:ring-gold transition duration-300"
              />
              <button type="submit" className="bg-gold text-dark px-6 py-3 rounded-r-full font-bold text-sm uppercase tracking-wider hover:bg-white transition duration-300">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs font-light tracking-wide mb-4 md:mb-0 uppercase">
            &copy; {new Date().getFullYear()} TravelBooking. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="text-gray-500 hover:text-gold transition duration-300">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-gold transition duration-300">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-gold transition duration-300">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;