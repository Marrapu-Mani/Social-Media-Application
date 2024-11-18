import express from 'express';

import authMiddleware from '../Middleware/auth.js';
import { commentPost, createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from '../controllers/post.js';

const router = express.Router();

// POST /post/
router.post('/', authMiddleware, createPost);

// GET /post/:id
router.get('/:id', getPost);

// PUT /post/:id
router.put('/:id', authMiddleware, updatePost);

// DELETE /post/:id
router.delete('/:id', authMiddleware, deletePost);

// PUT /post/:id/like
router.put('/:id/like', authMiddleware, likePost);

// PUT /post/:id/comment
router.put('/:id/comment', authMiddleware, commentPost);

// GET /post/:id/timeline
router.get('/:id/timeline', authMiddleware, getTimelinePosts);

export default router;