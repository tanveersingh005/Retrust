import express from 'express';
import { register, login, getMe, updateImpact, updateCreditHistory, updateEWasteReturns, sendNotification, redeemCredits } from '../controllers/authController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('ReTrust+ API is running!');
  });
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/impact', auth, updateImpact);
router.put('/credit-history', auth, updateCreditHistory);
router.put('/ewaste-returns', auth, updateEWasteReturns);
router.post('/notify', auth, sendNotification);
router.post('/redeem-credits', auth, redeemCredits);

export default router; 