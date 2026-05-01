import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import Login from './components/Login';       
import Register from './components/Register'; 
import MyBookings from './components/MyBookings'; // <-- 1. Import it

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* <-- 2. Add the new route here --> */}
        <Route path="/mybookings" element={<MyBookings />} /> 
      </Routes>
    </div>
  );
};

export default App;