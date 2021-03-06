import express, { Router } from 'express';
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/').post(registerUser).get(protect, admin, getUsers);

router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;