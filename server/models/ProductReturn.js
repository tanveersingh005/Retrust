import mongoose from 'mongoose';

const productReturnSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: String, required: true },
  condition: { type: String, required: true },
  co2Saved: { type: Number, default: 0 },
  credits: { type: Number, default: 0 },
  status: { type: String, default: 'In Transit' }, // In Transit, Recycled, Completed, etc.
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ProductReturn', productReturnSchema); 