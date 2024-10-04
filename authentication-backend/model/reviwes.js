// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

 const Review = mongoose.model('Review', reviewSchema);
 module.exports = Review;