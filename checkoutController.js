// @desc    Calculate checkout totals
// @route   POST /api/checkout/calculate
// @access  Public
const calculateCheckout = (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    // Calculate subtotal
    const subtotal = items.reduce((acc, item) => {
      // Assuming item has { price, quantity }
      return acc + (item.price * (item.quantity || 1));
    }, 0);

    // Calculate GST (18%)
    const gstRate = 0.18;
    const gstAmount = subtotal * gstRate;

    // Delivery charge (₹500 flat, maybe free over ₹50000)
    let deliveryCharge = 500;
    if (subtotal > 50000) {
        deliveryCharge = 0;
    }

    // Final total
    const total = subtotal + gstAmount + deliveryCharge;

    res.json({
      subtotal,
      gstRate: '18%',
      gstAmount,
      deliveryCharge,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  calculateCheckout
};
