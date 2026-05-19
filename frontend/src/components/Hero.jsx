const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' 
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-10">
        <h1 className="text-5xl md:text-7xl font-light text-white tracking-wide mb-6 drop-shadow-lg">
          Swift <span className="font-bold text-gold">Stay</span> Apartments
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-10 tracking-wider font-light drop-shadow-md">
          Experience Zambia's most exclusive apartments, from modern city centers to serene countryside retreats.
        </p>
        
        <button className="bg-gold text-dark px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
          Explore Apartments
        </button>
      </div>
    </div>
  );
};

export default Hero;