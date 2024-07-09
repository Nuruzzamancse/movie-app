const express = require('express');
const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require('../controllers/favoriteController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.use(protect);  // All favorite routes are protected

router.route('/')
  .get(getFavorites)
  .post(addFavorite);

router.route('/:id')
  .delete(removeFavorite);

module.exports = router;