import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const formattedCategory = categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Filter state
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedWood, setSelectedWood] = useState('All');

  const woodOptions = ['All', 'Sheesham', 'Teak', 'Mango', 'Engineered'];

  // Dummy filtered products since no DB is spun up yet
  const allProducts = [
    { id: 1, name: 'Sheesham Wood Sofa', price: 25000, woodType: 'Sheesham' },
    { id: 2, name: 'Teak Wood Coffee Table', price: 15000, woodType: 'Teak' },
    { id: 3, name: 'Mango Wood Side Table', price: 8000, woodType: 'Mango' },
    { id: 4, name: 'Premium Teak Sofa', price: 45000, woodType: 'Teak' },
    { id: 5, name: 'Engineered Wood TV Unit', price: 12000, woodType: 'Engineered' },
    { id: 6, name: 'Sheesham Dining Set', price: 35000, woodType: 'Sheesham' },
  ];

  const filteredProducts = allProducts.filter(p => {
    const priceMatch = p.price <= maxPrice;
    const woodMatch = selectedWood === 'All' || p.woodType === selectedWood;
    return priceMatch && woodMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      
      {/* Filters Sidebar */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md border border-[#f6dfd1] h-fit sticky top-24">
        <h2 className="text-xl font-bold text-[#652518] mb-6 flex items-center justify-between border-b pb-4">
          Filters
          <button 
             onClick={() => { setMaxPrice(50000); setSelectedWood('All'); }}
             className="text-sm text-[#cf5429] hover:underline font-normal">
             Reset
          </button>
        </h2>

        {/* Price Filter */}
        <div className="mb-8">
          <h3 className="font-semibold text-[#7e2a1b] mb-4">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h3>
          <input 
            type="range" 
            min="1000" 
            max="100000" 
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#cf5429] cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹1k</span>
            <span>₹100k</span>
          </div>
        </div>

        {/* Wood Type Filter */}
        <div>
          <h3 className="font-semibold text-[#7e2a1b] mb-4">Wood Type</h3>
          <div className="space-y-3">
            {woodOptions.map(wood => (
              <label key={wood} className="flex items-center cursor-pointer group">
                <input 
                  type="radio" 
                  name="woodType" 
                  value={wood}
                  checked={selectedWood === wood}
                  onChange={(e) => setSelectedWood(e.target.value)}
                  className="w-4 h-4 text-[#cf5429] focus:ring-[#cf5429] border-gray-300"
                />
                <span className="ml-3 text-sm text-[#652518] group-hover:text-[#cf5429] transition-colors">{wood}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full md:w-3/4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#652518]">{formattedCategory} Collection</h1>
          <span className="text-sm mt-2 sm:mt-0 text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-[#f6dfd1]">
            {filteredProducts.length} items
          </span>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg shadow border border-[#f6dfd1] hover:shadow-xl transition-shadow overflow-hidden block group">
                <div className="h-48 bg-[#efc1ac] flex items-center justify-center text-[#9b301a] group-hover:opacity-90 transition-opacity">
                  Image: {product.name}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-[#652518] truncate pr-2" title={product.name}>{product.name}</h3>
                  </div>
                  <span className="inline-block mb-3 text-xs font-bold text-[#d9744c] bg-[#fcf1ec] px-2 py-1 rounded border border-[#efc1ac]">{product.woodType} Wood</span>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-[#9b301a] text-xl">₹{product.price.toLocaleString('en-IN')}</div>
                    <span className="text-sm font-medium text-[#cf5429] group-hover:underline">View Details &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-lg border border-dashed border-[#e59d7d] flex flex-col items-center justify-center min-h-[400px]">
            <span className="text-4xl mb-4">🛋️</span>
            <p className="text-2xl font-bold text-[#7e2a1b] mb-2">No products found</p>
            <p className="text-[#a84429] max-w-md">Try adjusting your price range or selecting a different wood type to see more beautiful furniture pieces.</p>
            <button 
              onClick={() => { setMaxPrice(100000); setSelectedWood('All'); }}
              className="mt-6 bg-[#fcf1ec] border border-[#cf5429] text-[#cf5429] font-semibold py-2 px-6 rounded hover:bg-[#cf5429] hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
