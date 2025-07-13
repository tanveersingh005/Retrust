import express from 'express';
import { createReturn, updateReturnStatus, redeemCredits, getUserReturns, deleteReturn, getReturnById } from '../controllers/productReturnController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createReturn);
router.get('/', auth, getUserReturns);
router.get('/:id', auth, getReturnById);
router.put('/:id/status', auth, updateReturnStatus);
router.post('/:id/redeem', auth, redeemCredits);
router.delete('/:id', auth, deleteReturn);

export default router; 