/* global process */
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword, avatar });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // Always return avatar, fallback to default if missing
    const userObj = user.toObject();
    if (!userObj.avatar) {
      userObj.avatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    }
    res.json(userObj);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user impact (CO2_saved, credits, productsReturned)
export const updateImpact = async (req, res) => {
  try {
    const { CO2_saved, credits, productsReturned } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (CO2_saved !== undefined) user.CO2_saved = CO2_saved;
    if (credits !== undefined) user.credits = credits;
    if (productsReturned !== undefined) user.productsReturned = productsReturned;
    await user.save();
    res.json({ message: 'Impact updated', user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user credit history
export const updateCreditHistory = async (req, res) => {
  try {
    const { creditHistory, redeemedCredits } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (creditHistory) user.creditHistory = creditHistory;
    if (redeemedCredits) user.redeemedCredits = redeemedCredits;
    await user.save();
    res.json({ message: 'Credit history updated', user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user e-waste returns
export const updateEWasteReturns = async (req, res) => {
  try {
    const { eWasteReturns } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (eWasteReturns) user.eWasteReturns = eWasteReturns;
    await user.save();
    res.json({ message: 'E-Waste returns updated', user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Send notification to user
export const sendNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.notifications.push({ message, date: new Date().toISOString(), read: false });
    await user.save();
    res.json({ message: 'Notification sent', notifications: user.notifications });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Redeem credits for shop purchase
export const redeemCredits = async (req, res) => {
  try {
    const { item, credits } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.credits < credits) return res.status(400).json({ message: 'Not enough credits' });
    user.credits -= credits;
    user.redeemedCredits.push({ item, date: new Date().toISOString(), credits: -credits });
    user.notifications.push({
      message: `You redeemed ${credits} credits for '${item}'.`,
      date: new Date().toISOString(),
      read: false
    });
    await user.save();
    res.json({ message: 'Credits redeemed', user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}; 