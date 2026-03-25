import { Link } from 'react-router-dom';

const ProductListingPage = () => {
  // Placeholder data
  const products = [
    { id: 1, name: 'Sheesham Wood Sofa', price: 25000, category: 'Living Room', woodType: 'Sheesham' },
    { id: 2, name: 'Teak Wood Bed', price: 45000, category: 'Bedroom', woodType: 'Teak' },
    { id: 3, name: 'Mango Wood Dining Table', price: 35000, category: 'Dining', woodType: 'Mango' },
    { id: 4, name: 'Carved Wooden Chair', price: 8000, category: 'Living Room', woodType: 'Engineered' },
    { id: 5, name: 'Antique Bookshelf', price: 18000, category: 'Living Room', woodType: 'Mango' },
    { id: 6, name: 'Wooden Wardrobe', price: 32000, category: 'Bedroom', woodType: 'Sheesham' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#652518] mb-8">All Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-[#f6dfd1] hover:shadow-xl transition-shadow duration-300 group block">
            <div className="h-48 bg-[#efc1ac] flex items-center justify-center text-[#9b301a] group-hover:opacity-90 transition-opacity">
              Image: {product.name}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-[#d9744c] font-medium">{product.category}</p>
                <span className="text-xs bg-[#fcf1ec] px-1.5 py-0.5 rounded text-[#9b301a] border border-[#efc1ac]">{product.woodType}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#652518] mb-2 truncate" title={product.name}>{product.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-[#9b301a] text-lg">₹{product.price.toLocaleString('en-IN')}</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigating the outer Link
                    alert('Add to cart direct action');
                  }}
                  className="bg-[#fcf1ec] hover:bg-[#cf5429] hover:text-white text-[#7e2a1b] font-medium px-4 py-2 rounded text-sm transition-colors border border-[#e59d7d]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
