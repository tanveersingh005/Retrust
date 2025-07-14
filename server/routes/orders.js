import express from 'express';
import orderController from '../controllers/orderController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, orderController.createOrder);
router.get('/', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);

export default router;