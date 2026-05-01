import PropertyGrid from './PropertyGrid';

const Destinations = () => {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* We reuse your existing grid, adding top padding to clear the fixed navbar */}
      <PropertyGrid />
    </div>
  );
};

export default Destinations;