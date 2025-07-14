const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

// Create a new order
router.post('/', auth, orderController.createOrder);
// Get all orders for the logged-in user
router.get('/', auth, orderController.getUserOrders);
// Get a single order by ID
router.get('/:id', auth, orderController.getOrderById);

module.exports = router; 