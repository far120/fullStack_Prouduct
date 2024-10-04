const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Review = require('../model/reviwes'); // Corrected 'reviwes' typo
const Product = require('../model/products');
const User = require('../model/authentication');
const {validationReview} = require('../middleware/review');


// GET: Fetch reviews for a specific product
router.get('/:productId/reviews', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product_id: productId });
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Create a new review for a product
router.post('/:userId/:productId/reviews', async (req, res) => {
  const { userId, productId } = req.params;

  // Validate the request body
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new review
    const review = new Review({
      rating: req.body.rating,
      comment: req.body.comment,
      user_id: user._id,  
      product_id: product._id,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update an existing review
router.put('/:reviewId/reviews', validationReview ,  async (req, res) => {
  const { reviewId } = req.params;

  // Validate the request body
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5),
    comment: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Find the review
    const review = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Delete an existing review
router.delete('/:reviewId/reviews', validationReview , async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
