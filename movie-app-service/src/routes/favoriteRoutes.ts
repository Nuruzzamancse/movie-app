import express from 'express';
import {
  addFavorite,
  removeFavorite,
  getFavorites
} from '../controllers/favoriteController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);  // All favorite routes are protected

router.route('/')
  .get(getFavorites)
  .post(addFavorite);

router.route('/:id')
  .delete(removeFavorite);

export default router;
