import express from 'express';
import { addComment, getMovieComments, updateComment, deleteComment } from '../controllers/commentController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getMovieComments)
  .post(protect, addComment);

router.route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
