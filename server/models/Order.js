import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  image: { type: String },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Processing' },
  images: [{ type: String }],
});

const Order = mongoose.model('Order', orderSchema);
export default Order; 