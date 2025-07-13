import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
  credits: { type: Number, default: 0 },
  CO2_saved: { type: Number, default: 0 },
  productsReturned: { type: Number, default: 0 },
  creditHistory: [{
    item: String,
    date: String,
    co2Impact: String,
    credits: Number
  }],
  redeemedCredits: [{
    item: String,
    date: String,
    credits: Number
  }],
  notifications: [{
    message: String,
    date: String,
    read: { type: Boolean, default: false }
  }],
}, { timestamps: true });

export default mongoose.model('User', userSchema); 