import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#f6dfd1] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#652518] mb-6">Handcrafted Wooden Furniture</h1>
        <p className="text-lg text-[#7e2a1b] mb-8 max-w-2xl mx-auto">Bring the warmth of authentic Indian woodwork to your home. Explore our premium collection of handcrafted furniture.</p>
        <Link to="/products" className="bg-[#bb3f1c] hover:bg-[#9b301a] text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg inline-block">
          Shop Now
        </Link>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#652518]">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Living Room', 'Bedroom', 'Dining'].map((category) => (
            <Link key={category} to={`/category/${category.toLowerCase().replace(' ', '-')}`} className="group relative h-64 overflow-hidden rounded-lg shadow-md bg-[#efc1ac] flex items-center justify-center">
              {/* Placeholder for category image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#652518]/80 to-[#652518]/20 z-10 transition-opacity group-hover:opacity-80"></div>
              <h3 className="relative z-20 text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{category}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
