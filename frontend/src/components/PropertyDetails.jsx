import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the single property data from our newly created backend route
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://travelbooking-one.vercel.app/api/properties/${id}`);
        if (!response.ok) throw new Error('Could not fetch property details');
        const result = await response.json();
        
        setProperty(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center flex flex-col items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
        <p className="text-gray-500 uppercase tracking-widest text-sm">Loading Luxury...</p>
      </div>
    );
  }

  if (error) return <div className="pt-32 text-center text-red-500 min-h-screen bg-gray-50">{error}</div>;
  if (!property) return null;

  return (
    <div className="pt-32 min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <Link to="/" className="text-xs text-gray-500 hover:text-gold uppercase tracking-widest mb-8 inline-block transition duration-300">
          &larr; Back to Destinations
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Image & Details */}
          <div className="lg:w-2/3">
            <div className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] mb-10 shadow-xl">
              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="mb-4">
              <span className="text-gold uppercase tracking-widest text-sm font-semibold">
                {property.location.city}, {property.location.country}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-dark mb-6">{property.title}</h1>
            
            <div className="text-gray-600 font-light leading-relaxed mb-12 text-lg">
              <p>{property.description}</p>
            </div>

            <h3 className="text-xl font-medium text-dark mb-6 tracking-wide">World-Class Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {property.amenities.map((amenity, index) => (
                <span key={index} className="px-5 py-2.5 bg-white border border-gray-100 rounded-full text-sm text-gray-600 shadow-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: The Booking Widget */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 sticky top-32">
              <div className="mb-8 pb-8 border-b border-gray-100">
                <span className="text-4xl font-light text-dark">${property.basePrice}</span>
                <span className="text-gray-500 text-sm tracking-wide"> / night</span>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Check-In</label>
                    <input type="date" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">Check-Out</label>
                    <input type="date" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none transition bg-gray-50" />
                  </div>
                </div>

                <button type="button" className="w-full bg-dark text-white py-4 rounded-full font-bold uppercase tracking-[0.15em] text-sm hover:bg-gold transition duration-300 shadow-lg hover:shadow-xl mt-4">
                  Reserve Now
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-6 tracking-wide">You won't be charged yet.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;