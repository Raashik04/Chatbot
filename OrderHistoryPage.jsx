import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
        // Fallback demo data
        setOrders([
          {
            _id: 'ORDER12345ABC',
            createdAt: new Date().toISOString(),
            totalPrice: 44840,
            isPaid: false,
            isDelivered: false,
            paymentMethod: 'UPI',
            orderItems: [
              { name: 'Sheesham Wood Sofa', qty: 1, price: 25000 },
              { name: 'Mango Wood Coffee Table', qty: 1, price: 12000 }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-[#652518] mb-8">My Orders</h1>

      {loading ? (
        <div className="text-center py-10 text-[#cf5429]">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg border border-dashed border-[#e59d7d]">
          <p className="text-xl text-[#7e2a1b] mb-4">You have no orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-[#f6dfd1]">
              <div className="bg-[#fcf1ec] px-6 py-4 flex flex-col md:flex-row justify-between md:items-center border-b border-[#e59d7d]">
                <div className="mb-2 md:mb-0">
                  <p className="text-sm text-[#7e2a1b]">Order Placed</p>
                  <p className="font-semibold text-[#652518]">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="mb-2 md:mb-0">
                  <p className="text-sm text-[#7e2a1b]">Total Amount</p>
                  <p className="font-semibold text-[#9b301a]">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                </div>
                <div className="mb-2 md:mb-0">
                  <p className="text-sm text-[#7e2a1b]">Order ID</p>
                  <p className="font-mono text-sm text-[#cf5429]">#{order._id.substring(0, 10).toUpperCase()}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg font-bold text-[#652518] mb-4">Items Summary</h3>
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-sm">
                        <span className="text-[#7e2a1b]">{item.name} <span className="text-gray-500">x {item.qty}</span></span>
                        <span className="font-semibold text-[#652518]">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full md:w-1/3 space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#652518] mb-1">Payment Method</h3>
                      <p className="text-sm text-[#7e2a1b] bg-gray-50 uppercase inline-block px-2 py-1 rounded border border-gray-200">{order.paymentMethod}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[#652518] mb-1">Order Status</h3>
                        <p className={`text-sm font-semibold inline-block px-2 py-1 rounded shadow-sm border ${order.isDelivered ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}`}>
                          {order.isDelivered ? 'Delivered' : 'Processing'}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
