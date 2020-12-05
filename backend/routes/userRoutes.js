import express, { Router } from 'express';
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers } from '../controllers/userController.js';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/').post(registerUser).get(protect, admin, getUsers);

export default router;