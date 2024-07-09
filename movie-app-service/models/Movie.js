const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a movie name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  runningTime: {
    type: Number,
    required: [true, 'Please add a running time']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Please add a thumbnail URL']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);