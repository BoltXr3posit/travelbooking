import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar always stays on top */}
      <Navbar />
      
      {/* Routes decide what goes in the main area */}
      <Routes>
        {/* FIX: Notice how there are no quotes around the curly braces here! */}
        <Route path="/" element={<Home />} />
        
        {/* If the URL is "/property/123", show the details page for ID 123 */}
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </div>
  );
};

export default App;