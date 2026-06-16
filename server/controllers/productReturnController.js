import ProductReturn from '../models/ProductReturn.js';
import User from '../models/User.js';

// Create a new product return
export const createReturn = async (req, res, next) => {
  try {
    const { item, condition, images } = req.body;

    // Input validation
    if (!item || typeof item !== 'string' || item.trim().length === 0) {
      return res.status(400).json({ message: 'Item name is required' });
    }
    if (!condition || !['Good', 'Average', 'Poor'].includes(condition)) {
      return res.status(400).json({ message: 'Valid condition is required (Good, Average, or Poor)' });
    }

    // CO2 and credits calculation based on condition
    let co2Saved = 0, credits = 0;
    if (condition === 'Good') { co2Saved = 10; credits = 50; }
    else if (condition === 'Average') { co2Saved = 5; credits = 25; }
    else { co2Saved = 2; credits = 10; }
    const productReturn = await ProductReturn.create({
      user: req.user.id,
      item,
      condition,
      co2Saved,
      credits,
      images,
      status: 'In Transit'
    });
    res.status(201).json(productReturn);
  } catch (err) {
    next(err);
  }
};

// Update return status (admin/system)
export const updateReturnStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const productReturn = await ProductReturn.findById(req.params.id);
    if (!productReturn) return res.status(404).json({ message: 'Return not found' });
    productReturn.status = status;
    productReturn.updatedAt = new Date();
    await productReturn.save();
    // Send notification to user
    const user = await User.findById(productReturn.user);
    if (user) {
      user.notifications.push({
        message: `Your return for '${productReturn.item}' is now '${status}'.`,
        date: new Date().toISOString(),
        read: false
      });
      await user.save();
    }
    res.json(productReturn);
  } catch (err) {
    next(err);
  }
};

// Redeem credits for a completed return
export const redeemCredits = async (req, res, next) => {
  try {
    const productReturn = await ProductReturn.findById(req.params.id);
    if (!productReturn) return res.status(404).json({ message: 'Return not found' });
    if (productReturn.status !== 'Recycled') return res.status(400).json({ message: 'Return not completed yet' });
    const user = await User.findById(productReturn.user);
    user.credits += productReturn.credits;
    user.CO2_saved += productReturn.co2Saved;
    user.productsReturned += 1;
    user.creditHistory.push({
      item: productReturn.item,
      date: new Date().toISOString(),
      co2Impact: `${productReturn.co2Saved}kg`,
      credits: productReturn.credits
    });
    user.notifications.push({
      message: `You redeemed ${productReturn.credits} credits for returning '${productReturn.item}'.`,
      date: new Date().toISOString(),
      read: false
    });
    await user.save();
    res.json({ message: 'Credits redeemed', user });
  } catch (err) {
    next(err);
  }
};

// Delete a product return
export const deleteReturn = async (req, res, next) => {
  try {
    const productReturn = await ProductReturn.findById(req.params.id);
    if (!productReturn) {
      return res.status(404).json({ message: 'Return not found' });
    }
    if (productReturn.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await productReturn.deleteOne();
    res.json({ message: 'Return deleted' });
  } catch (err) {
    next(err);
  }
};

// Get all returns for the logged-in user
export const getUserReturns = async (req, res, next) => {
  try {
    const returns = await ProductReturn.find({ user: req.user.id });
    res.json(returns);
  } catch (err) {
    next(err);
  }
};

export const getReturnById = async (req, res, next) => {
  try {
    const productReturn = await ProductReturn.findById(req.params.id);
    if (!productReturn) return res.status(404).json({ message: 'Return not found' });
    if (productReturn.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(productReturn);
  } catch (err) {
    next(err);
  }
}; 