import Order from '../models/Order.js';
import User from '../models/User.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, total, images } = req.body;

    // Input validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }
    if (!total || typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ message: 'Valid order total is required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.credits < total) {
      return res.status(400).json({ message: 'Not enough credits' });
    }
    user.credits -= total;
    await user.save();
    const order = new Order({ user: user._id, items, total, images });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
}; 