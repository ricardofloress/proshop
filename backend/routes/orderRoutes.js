import express, { Router } from 'express';
import { addOrderItems, getOrderbyId, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id/pay').get(protect, updateOrderToPaid);

router.route('/:id').get(protect, getOrderbyId);


export default router;