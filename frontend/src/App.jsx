import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import Login from './components/Login';       
import Register from './components/Register'; 
import MyBookings from './components/MyBookings';
import Destinations from './components/Destinations'; 
import Experiences from './components/Experiences';   
import AdminDashboard from './components/AdminDashboard'; 
import Footer from './components/Footer'; // <-- 1. Import the Footer

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* 2. Wrap Routes in a main tag with flex-grow to push footer to the bottom */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mybookings" element={<MyBookings />} /> 
          <Route path="/destinations" element={<Destinations />} /> 
          <Route path="/experiences" element={<Experiences />} /> 
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes>
      </main>

      {/* 3. Add the Footer here */}
      <Footer />
    </div>
  );
};

export default App;