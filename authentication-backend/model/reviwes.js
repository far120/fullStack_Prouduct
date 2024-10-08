// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  Reviews:[
    {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username:{
      type: String,
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
  }

  ],
  totalrating: {
    type: Number,
    default: 0,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.pre('save', function (next) {
  const total = this.Reviews.reduce((sum, review) => sum + review.rating, 0);
  this.totalrating = total / this.Reviews.length;
  next();
})

 const Review = mongoose.model('Review', reviewSchema);
 module.exports = Review;