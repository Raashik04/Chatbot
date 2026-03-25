import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#4c1910] text-[#f6dfd1] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">DesiWood Mart</h3>
          <p className="text-sm opacity-80">Authentic Indian craftsmanship brought to your modern home. Quality wooden furniture that lasts generations.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Shop All</Link></li>
            <li><Link to="/category/living-room" className="hover:text-white transition">Living Room</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>123 Wood Street, Mumbai, India</li>
            <li>Email: support@desiwoodmart.com</li>
            <li>Phone: +91 98765 43210</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-[#652518] text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} DesiWood Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
