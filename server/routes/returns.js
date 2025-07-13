import express from 'express';
import { createReturn, updateReturnStatus, redeemCredits, getUserReturns } from '../controllers/productReturnController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createReturn);
router.get('/', auth, getUserReturns);
router.put('/:id/status', auth, updateReturnStatus);
router.post('/:id/redeem', auth, redeemCredits);

export default router; 