import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import Login from './components/Login';       
import Register from './components/Register'; 
import MyBookings from './components/MyBookings';
import Destinations from './components/Destinations'; 
import Experiences from './components/Experiences';   
import AdminDashboard from './components/AdminDashboard'; // <-- 1. Import the Admin Panel

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybookings" element={<MyBookings />} /> 
        <Route path="/destinations" element={<Destinations />} /> 
        <Route path="/experiences" element={<Experiences />} /> 
        
        {/* <-- 2. Add the Admin route here --> */}
        <Route path="/admin" element={<AdminDashboard />} /> 
      </Routes>
    </div>
  );
};

export default App;