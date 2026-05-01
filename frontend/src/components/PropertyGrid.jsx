import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PropertyGrid = () => {
  // Setup our state variables to hold the data, loading status, and errors
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data from your Node.js backend when the component loads
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties from the engine.');
        }
        const result = await response.json();
        
        // Our backend sends the array of properties inside a "data" object
        setProperties(result.data); 
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Show a luxury gold spinner while waiting for the database
  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  // Show an error if the engine is turned off
  if (error) {
    return <div className="text-center py-20 text-red-500 bg-gray-50 font-mono text-sm">{error}</div>;
  }

  return (
    <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-dark mb-4">
            Featured <span className="font-bold text-gold">Destinations</span>
          </h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            Discover your next escape
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property) => (
            <div key={property._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer border border-gray-100">
              
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-dark shadow-sm">
                  ${property.basePrice} <span className="text-xs text-gray-500 font-normal">/ night</span>
                </div>
              </div>
              
              {/* Card Details */}
              <div className="p-8">
                <div className="text-xs text-gold uppercase tracking-widest mb-2 font-semibold">
                  {property.location.city}, {property.location.country}
                </div>
                <h3 className="text-2xl font-light text-dark mb-3 group-hover:text-gold transition duration-300">
                  {property.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2">
                  {property.description}
                </p>
                
                {/* Amenities Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                      +{property.amenities.length - 3}
                    </span>
                  )}
                </div>

                {/* FIX: Corrected Link syntax using curly braces and backticks */}
                <Link to={`/property/${property._id}`} className="block text-center w-full border border-dark text-dark py-3 rounded-full hover:bg-dark hover:text-white transition duration-300 tracking-wider text-sm font-medium uppercase">
                  View Details
                </Link>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PropertyGrid;