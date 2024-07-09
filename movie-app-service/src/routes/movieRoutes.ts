import express from 'express';
import {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movieController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(getMovies)
  .post(protect, authorize('admin'), createMovie);

router
  .route('/:id')
  .get(getMovie)
  .put(protect, authorize('admin'), updateMovie)
  .delete(protect, authorize('admin'), deleteMovie);

export default router;
