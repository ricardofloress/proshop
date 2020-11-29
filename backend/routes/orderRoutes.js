import express, { Router } from 'express';
import { addOrderItems, getOrderbyId, updateOrderToPaid } from '../controllers/orderController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);

router.route('/:id').get(protect, getOrderbyId);

router.route('/:id/pay').get(protect, updateOrderToPaid);

export default router;