import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { token } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // If they aren't logged in, kick them out to the login page
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchMyBookings = async () => {
      try {
        const response = await fetch('https://travelbooking-one.vercel.app/api/bookings/mybookings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` // Pass the VIP token
          }
        });

        const result = await response.json();

        if (response.ok) {
          setBookings(result.data);
        } else {
          showToast(result.message || 'Failed to fetch bookings', 'error');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        showToast('Could not connect to the server.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [token, navigate, showToast]);

  // A helper function to make dates look nice (e.g., "May 1, 2026")
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="pt-32 text-center flex flex-col items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
        <p className="text-gray-500 uppercase tracking-widest text-sm">Loading Itineraries...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-gray-50 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl font-light text-dark mb-2">My <span className="font-bold text-gold">Itineraries</span></h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm">Your secured luxury escapes</p>
        </div>

        {/* Empty State if they have no bookings */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <h3 className="text-2xl font-light text-dark mb-4">No reservations yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't booked any luxury stays. Explore our curated collection to find your next escape.</p>
            <Link to="/" className="bg-dark text-white px-8 py-3 rounded-full hover:bg-gold transition duration-300 tracking-wide text-sm font-medium uppercase inline-block shadow-md">
              Explore Destinations
            </Link>
          </div>
        ) : (
          /* The Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                
                {/* Property Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {/* We check if property and images exist just in case a property was deleted from the DB */}
                  {booking.property && booking.property.images && booking.property.images.length > 0 ? (
                    <img 
                      src={booking.property.images[0]} 
                      alt={booking.property.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Image Unavailable</div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-green-600 shadow-sm">
                    {booking.status}
                  </div>
                </div>
                
                {/* Booking Details */}
                <div className="p-6">
                  <div className="text-xs text-gold uppercase tracking-widest mb-1 font-semibold">
                    {booking.property ? `${booking.property.location.city}, ${booking.property.location.country}` : 'Unknown Location'}
                  </div>
                  <h3 className="text-xl font-medium text-dark mb-4 line-clamp-1">
                    {booking.property ? booking.property.title : 'Property Unavailable'}
                  </h3>
                  
                  <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 uppercase tracking-wider text-xs font-medium">Check-In</span>
                      <span className="text-dark font-medium">{formatDate(booking.checkInDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 uppercase tracking-wider text-xs font-medium">Check-Out</span>
                      <span className="text-dark font-medium">{formatDate(booking.checkOutDate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-gray-500 text-sm">Total Price</span>
                    <span className="text-2xl font-light text-dark">${booking.totalPrice}</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;