import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AdminDashboard = () => {
  // 1. Pull userRole from the context vault
  const { token, userRole } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    basePrice: '',
    city: '',
    country: 'Zambia',
    maxGuests: '',
    amenities: '', 
    images: ''     
  });

  // 1. Fetch Properties Function (Memoized)
  const fetchProperties = useCallback(async () => {
    try {
      const response = await fetch('https://travelbooking-one.vercel.app/api/properties');
      const result = await response.json();
      if (response.ok) {
        setProperties(result.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error); 
      showToast('Failed to load portfolio', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]); 

  // 2. Updated Security Bouncer inside useEffect
  useEffect(() => {
    // Check if logged in at all
    if (!token) {
      navigate('/login');
      return;
    }

    // FRONTEND SECURITY: If they aren't an admin, kick them out immediately
    if (userRole !== 'admin') {
      showToast('Access denied. Administrators only.', 'error');
      navigate('/');
      return;
    }

    const loadProperties = async () => {
      await fetchProperties();
    };

    loadProperties();
  }, [token, userRole, navigate, fetchProperties, showToast]); // Added dependencies

  // 3. Handle Form Submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    showToast('Saving property...', 'success');

    const formattedData = {
      title: formData.title,
      description: formData.description,
      basePrice: Number(formData.basePrice),
      maxGuests: Number(formData.maxGuests),
      location: { city: formData.city, country: formData.country },
      amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
      images: formData.images.split(',').map(item => item.trim()).filter(Boolean)
    };

    const url = editingId 
      ? `https://travelbooking-one.vercel.app/api/properties/${editingId}` 
      : 'https://travelbooking-one.vercel.app/api/properties';
      
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      });

      const result = await response.json();

      if (response.ok) {
        showToast(`Property ${editingId ? 'updated' : 'added'} successfully!`, 'success');
        closeModal();
        fetchProperties(); 
      } else {
        showToast(result.message, 'error');
      }
    } catch (error) {
      console.error("Submit Error:", error); 
      showToast('Network error while saving.', 'error');
    }
  };

  // 4. Handle Deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this luxury property?')) return;

    try {
      const response = await fetch(`https://travelbooking-one.vercel.app/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        showToast('Property removed from portfolio.', 'success');
        setProperties(properties.filter(p => p._id !== id));
      } else {
        const result = await response.json();
        showToast(result.message, 'error');
      }
    } catch (error) {
      console.error("Delete Error:", error); 
      showToast('Network error while deleting.', 'error');
    }
  };

  // Modal Helpers
  const openModal = (property = null) => {
    if (property) {
      setEditingId(property._id);
      setFormData({
        title: property.title,
        description: property.description,
        basePrice: property.basePrice,
        city: property.location.city,
        country: property.location.country,
        maxGuests: property.maxGuests,
        amenities: property.amenities.join(', '),
        images: property.images.join(', ')
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', basePrice: '', city: '', country: 'Zambia', maxGuests: '', amenities: '', images: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  if (loading) return <div className="pt-32 text-center">Loading Command Center...</div>;

  return (
    <div className="pt-32 min-h-screen bg-gray-50 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-light text-dark mb-2">Portfolio <span className="font-bold text-gold">Command</span></h1>
            <p className="text-gray-500 uppercase tracking-widest text-sm">Manage Apartments</p>
          </div>
          <button onClick={() => openModal()} className="bg-dark text-white px-8 py-3 rounded-full hover:bg-gold transition duration-300 tracking-wide text-sm font-medium uppercase shadow-md">
            + Add Property
          </button>
        </div>

        {/* The Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-500">
                <th className="p-6 font-medium">Property</th>
                <th className="p-6 font-medium">Location</th>
                <th className="p-6 font-medium">Base Price</th>
                <th className="p-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map(property => (
                <tr key={property._id} className="hover:bg-gray-50/50 transition duration-150">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={property.images[0] || 'https://via.placeholder.com/50'} alt="thumb" className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium text-dark">{property.title}</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-600">{property.location.city}, {property.location.country}</td>
                  <td className="p-6 text-dark font-medium">${property.basePrice}</td>
                  <td className="p-6 text-right space-x-4">
                    <button onClick={() => openModal(property)} className="text-sm font-medium text-blue-600 hover:text-blue-800 uppercase tracking-wider">Edit</button>
                    <button onClick={() => handleDelete(property._id)} className="text-sm font-medium text-red-600 hover:text-red-800 uppercase tracking-wider">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* The Slide-Over Modal for Create/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-dark">{editingId ? 'Edit' : 'Add'} <span className="font-bold text-gold">Property</span></h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-dark text-2xl">&times;</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none h-24" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Base Price ($)</label>
                    <input required type="number" value={formData.basePrice} onChange={e => setFormData({...formData, basePrice: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Max Guests</label>
                    <input required type="number" value={formData.maxGuests} onChange={e => setFormData({...formData, maxGuests: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Country</label>
                    <input required type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Amenities (Comma separated)</label>
                  <input type="text" placeholder="WiFi, Pool, Spa" value={formData.amenities} onChange={e => setFormData({...formData, amenities: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Image URLs (Comma separated)</label>
                  <input type="text" placeholder="https://image1.jpg, https://image2.jpg" value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gold outline-none" />
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-dark text-white py-4 rounded-full font-bold uppercase tracking-[0.15em] text-sm hover:bg-gold transition duration-300 shadow-lg">
                    {editingId ? 'Update Property' : 'Save Property'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;