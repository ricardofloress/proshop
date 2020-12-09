import express, { Router } from 'express';
import { deleteProduct, getProductById, getProducts, updateProduct, createProduct } from '../controllers/productController.js';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

export default router;