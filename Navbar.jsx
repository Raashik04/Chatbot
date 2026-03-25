import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User as UserIcon, LogOut, Package } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-[#652518] text-[#fcf1ec] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4 sm:hidden cursor-pointer" />
            <Link to="/" className="text-2xl font-bold tracking-tight">
              DesiWood <span className="text-[#e59d7d]">Mart</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex space-x-8">
            <Link to="/" className="hover:text-[#e59d7d] transition-colors">Home</Link>
            <Link to="/products" className="hover:text-[#e59d7d] transition-colors">All Products</Link>
            <Link to="/category/living-room" className="hover:text-[#e59d7d] transition-colors">Living Room</Link>
            <Link to="/category/bedroom" className="hover:text-[#e59d7d] transition-colors">Bedroom</Link>
          </div>

          <div className="flex items-center space-x-6">
            <Search className="h-5 w-5 cursor-pointer hover:text-[#e59d7d] transition-colors" />
            
            {/* User Dropdown */}
            <div className="relative">
              {user ? (
                <div 
                  className="flex items-center cursor-pointer hover:text-[#e59d7d] transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium hidden sm:block">{user.name.split(' ')[0]}</span>
                </div>
              ) : (
                <Link to="/login" className="flex items-center hover:text-[#e59d7d] transition-colors text-sm font-medium">
                  <UserIcon className="h-5 w-5 mr-1" /> Login
                </Link>
              )}

              {/* Dropdown Menu */}
              {user && dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-[#f6dfd1] text-[#652518]">
                  <Link 
                    to="/orders" 
                    className="flex items-center px-4 py-2 text-sm hover:bg-[#fcf1ec] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Package className="h-4 w-4 mr-2 text-[#cf5429]" /> My Orders
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-[#fcf1ec] transition-colors text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link to="/checkout" className="relative cursor-pointer hover:text-[#e59d7d] transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-[#cf5429] text-xs text-white rounded-full h-4 w-4 flex items-center justify-center shadow-sm">2</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
