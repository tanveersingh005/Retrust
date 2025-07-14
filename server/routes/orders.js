import express from 'express';
import { createOrder, getUserOrders, getOrderById } from '../controllers/orderController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);
router.get('/:id', auth, getOrderById);

export default router;