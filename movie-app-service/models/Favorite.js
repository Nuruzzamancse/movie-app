const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Prevent user from favoriting a movie more than once
FavoriteSchema.index({ movie: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);