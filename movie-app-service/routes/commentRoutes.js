const express = require('express');
const {
  addComment,
  getMovieComments,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getMovieComments)
  .post(protect, addComment);

router.route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;