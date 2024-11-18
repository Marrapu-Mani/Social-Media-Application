import express from 'express';

import authMiddleware from '../Middleware/auth.js';
import { deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser } from '../controllers/user.js';

const router = express.Router();

// GET /user/
router.get('/', getAllUsers);

// GET /user/:id
router.get('/:id', getUser);

// PUT /user/:id
router.put('/:id', authMiddleware, updateUser);

// DELETE /user/:id
router.delete('/:id', authMiddleware, deleteUser);

// POST /user/:id/follow
router.post('/:id/follow', authMiddleware, followUser);

// POST /user/:id/unfollow
router.post('/:id/unfollow', authMiddleware, unfollowUser);

export default router;
