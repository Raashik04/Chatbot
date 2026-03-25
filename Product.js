const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., 'Sofas', 'Beds', 'Chairs', 'Tables'
  woodOptions: [{ type: String }], // e.g., ['Sheesham', 'Teak', 'Mango']
  imageUrl: { type: String, required: true },
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
