import ProductReturn from '../models/ProductReturn.js';
import User from '../models/User.js';

// Create a new product return
export const createReturn = async (req, res) => {
  try {
    const { item, condition, images } = req.body;
    // Example logic for CO2 and credits
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
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update return status (admin/system)
export const updateReturnStatus = async (req, res) => {
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
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Redeem credits for a completed return
export const redeemCredits = async (req, res) => {
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
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product return
export const deleteReturn = async (req, res) => {
  try {
    console.log('DELETE request for return:', req.params.id);
    const productReturn = await ProductReturn.findById(req.params.id);
    if (!productReturn) {
      console.log('Return not found');
      return res.status(404).json({ message: 'Return not found' });
    }
    console.log('Found return:', productReturn);
    console.log('Return user:', productReturn.user.toString(), 'Request user:', req.user.id);
    if (productReturn.user.toString() !== req.user.id) {
      console.log('Not authorized');
      return res.status(403).json({ message: 'Not authorized' });
    }
    await productReturn.deleteOne();
    console.log('Return deleted');
    res.json({ message: 'Return deleted' });
  } catch (err) {
    console.log('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all returns for the logged-in user
export const getUserReturns = async (req, res) => {
  try {
    const returns = await ProductReturn.find({ user: req.user.id });
    res.json(returns);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}; 