import express, { Router } from 'express';
import { addOrderItems, getOrderbyId } from '../controllers/orderController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);

router.route('/:id').get(protect, getOrderbyId);

export default router;