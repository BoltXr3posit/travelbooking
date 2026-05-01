const Experiences = () => {
  // A hard-coded array of luxury experiences to make the page pop
  const experiences = [
    {
      title: "Guided Safaris",
      description: "Experience the raw beauty of the African wilderness with our expert trackers. Get up close with the Big Five in their natural habitat while enjoying five-star service in the bush.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1468&auto=format&fit=crop"
    },
    {
      title: "Wellness Retreats",
      description: "Rejuvenate your mind, body, and soul. Our world-class spa facilities offer bespoke treatments, hot springs, and meditation sessions surrounded by untouched nature.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Private Dining",
      description: "Exclusive culinary experiences under the stars. Enjoy bespoke menus prepared by Michelin-starred chefs, perfectly paired with selections from our private wine cellars.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 min-h-screen bg-gray-50 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-dark mb-4">Curated <span className="font-bold text-gold">Experiences</span></h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm">Elevate your journey beyond the destination</p>
        </div>

        {/* The Staggered Grid */}
        <div className="space-y-24">
          {experiences.map((exp, index) => (
            // If the index is odd, we reverse the row so the image is on the right
            <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Half */}
              <div className="w-full lg:w-1/2 h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-in-out" />
              </div>
              
              {/* Text Half */}
              <div className="w-full lg:w-1/2 space-y-6 lg:px-8">
                <div className="text-xs text-gold uppercase tracking-widest font-semibold">Bespoke Activity</div>
                <h2 className="text-4xl font-light text-dark">{exp.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed font-light">{exp.description}</p>
                
                <button className="mt-4 border-b border-dark text-dark pb-1 hover:text-gold hover:border-gold transition duration-300 tracking-widest text-sm font-medium uppercase">
                  Inquire Now &rarr;
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Experiences;