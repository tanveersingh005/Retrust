/* global process */
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  // Input validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Valid email address is required' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    let user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user) return res.status(400).json({ message: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword, avatar });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const userObj = user.toObject();
    delete userObj.password;
    if (!userObj.avatar) userObj.avatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    res.status(201).json({ token, user: userObj });
  } catch (err) {
    next(err);
  }
};

// Login user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const userObj = user.toObject();
    delete userObj.password;
    if (!userObj.avatar) userObj.avatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    res.json({ token, user: userObj });
  } catch (err) {
    next(err);
  }
};

// Get current user
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Always return avatar, fallback to default if missing
    const userObj = user.toObject();
    if (!userObj.avatar) {
      userObj.avatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    }
    res.json(userObj);
  } catch (err) {
    next(err);
  }
};

// Update user impact (CO2_saved, credits, productsReturned)
export const updateImpact = async (req, res, next) => {
  try {
    const { CO2_saved, credits, productsReturned } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (CO2_saved !== undefined) user.CO2_saved = CO2_saved;
    if (credits !== undefined) user.credits = credits;
    if (productsReturned !== undefined) user.productsReturned = productsReturned;
    await user.save();
    res.json({ message: 'Impact updated', user });
  } catch (err) {
    next(err);
  }
};

// Update user credit history
export const updateCreditHistory = async (req, res, next) => {
  try {
    const { creditHistory, redeemedCredits } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (creditHistory) user.creditHistory = creditHistory;
    if (redeemedCredits) user.redeemedCredits = redeemedCredits;
    await user.save();
    res.json({ message: 'Credit history updated', user });
  } catch (err) {
    next(err);
  }
};

// Update user e-waste returns
export const updateEWasteReturns = async (req, res, next) => {
  try {
    const { eWasteReturns } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (eWasteReturns) user.eWasteReturns = eWasteReturns;
    await user.save();
    res.json({ message: 'E-Waste returns updated', user });
  } catch (err) {
    next(err);
  }
};

// Send notification to user
export const sendNotification = async (req, res, next) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.notifications.push({ message, date: new Date().toISOString(), read: false });
    await user.save();
    res.json({ message: 'Notification sent', notifications: user.notifications });
  } catch (err) {
    next(err);
  }
};

// Redeem credits for shop purchase
export const redeemCredits = async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
}; 