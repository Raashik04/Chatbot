import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const [selectedWood, setSelectedWood] = useState('');

  // Dummy data simulation since we don't have a database seeded yet.
  const product = {
    id: id,
    name: 'Handcrafted Wooden Furniture Piece',
    price: 15999,
    category: 'Living Room',
    description: 'This uniquely crafted product adds warmth to your home. Designed with traditional Indian aesthetics in a modern form factor.',
    woodOptions: ['Sheesham', 'Teak', 'Mango'],
    imageUrl: 'https://via.placeholder.com/500x400/efc1ac/9b301a?text=Furniture',
    inStock: true
  };

  useEffect(() => {
    if (product.woodOptions && product.woodOptions.length > 0) {
      setSelectedWood(product.woodOptions[0]);
    }
  }, []);

  const handleAddToCart = () => {
    alert(`Added to cart: ${product.name} (${selectedWood}) for ₹${product.price.toLocaleString('en-IN')}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link to="/products" className="text-[#cf5429] hover:text-[#9b301a] transition-colors font-medium">
          &larr; Back to all products
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2 h-96 md:h-auto bg-[#efc1ac] flex items-center justify-center">
            {/* Real app would use product.imageUrl */}
            <span className="text-[#9b301a] text-2xl font-bold">Image: {product.name}</span>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <p className="text-sm text-[#d9744c] font-bold uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#652518] mb-4">{product.name}</h1>
          
          <div className="text-3xl font-bold text-[#9b301a] mb-6 border-b border-[#f6dfd1] pb-6">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          
          <p className="text-[#7e2a1b] mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Wood Type Selection */}
          <div className="mb-8">
            <h3 className="font-semibold text-[#652518] mb-3">Select Wood Type:</h3>
            <div className="flex flex-wrap gap-3">
              {product.woodOptions.map(wood => (
                <button
                  key={wood}
                  onClick={() => setSelectedWood(wood)}
                  className={`px-4 py-2 rounded border focus:outline-none transition-colors ${
                    selectedWood === wood 
                      ? 'bg-[#652518] text-white border-[#652518] shadow-md' 
                      : 'bg-white text-[#7e2a1b] border-[#e59d7d] hover:bg-[#fcf1ec]'
                  }`}
                >
                  {wood} Wood
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <div className="flex items-center border border-[#e59d7d] rounded bg-[#fcf1ec]">
              <button className="px-4 py-3 text-[#7e2a1b] hover:bg-[#f6dfd1] font-bold">-</button>
              <span className="px-4 py-3 font-semibold text-[#652518]">1</span>
              <button className="px-4 py-3 text-[#7e2a1b] hover:bg-[#f6dfd1] font-bold">+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#cf5429] hover:bg-[#9b301a] text-white font-bold py-3 px-8 rounded shadow-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
