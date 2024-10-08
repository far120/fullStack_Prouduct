const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Review = require('../model/reviwes'); // Corrected 'reviwes' typo
const Product = require('../model/products');
const User = require('../model/authentication');
const {validationReview} = require('../middleware/review');


// GET: Fetch reviews for a specific product
router.get('/:productId', async (req, res) => {
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


router.post('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

 
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
 
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    let reviewDocument = await Review.findOne({ product_id: productId });
    if (!reviewDocument) {
      reviewDocument = new Review({ product_id: productId, Reviews: [] });
    }

    if (reviewDocument.Reviews.some(item => item.user_id.toString() === userId)) {
      return res.status(400).json({ message: 'you add review before' });
  }

    const newReview = {
      user_id: user._id,
      username: user.name,
      rating: req.body.rating,
      comment: req.body.comment,
    };
    reviewDocument.Reviews.push(newReview);

    await reviewDocument.save();

    // add new review in product
    product.totalrating = reviewDocument.totalrating;
    await product.save();

    // add new review in user
    user.products.push({
      product: productId,
      actions:'add review',
    });
    await user.save();


    res.status(201).json(reviewDocument);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT: Update an existing review
router.put('/:userId/:productId',   async (req, res) => {
  const { reviewId , userId , productId } = req.params;

  const schema = Joi.object({
    rating: Joi.number().min(1).max(5),
    comment: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    let reviewDocument = await Review.findOne({ product_id: productId });
    if (!reviewDocument) {
      return res.status(404).json({ message: 'Review not found' });
    }


    const reviewToUpdate = reviewDocument.Reviews.find(item => item.user_id.toString() === userId);
    if (!reviewToUpdate) {
      return res.status(401).json({ message: 'You are not authorized to update this review' });
    }
   

    reviewToUpdate.rating = req.body.rating || reviewToUpdate.rating;
    reviewToUpdate.comment = req.body.comment || reviewToUpdate.comment;
    

        await reviewDocument.save();

    product.totalrating = reviewDocument.totalrating;
    await product.save();

    
    user.products.push({
      product: productId,
      actions:'update review',
    });
    await user.save();

    res.json(reviewDocument);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

   
});

// DELETE: Delete an existing review
router.delete('/:userId/:productId', async (req, res) => {
  const { reviewId, userId, productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    let reviewDocument = await Review.findOne({ product_id: productId });
    if (!reviewDocument) {
      return res.status(404).json({ message: 'Review not found' });
    }
    reviewDocument.Reviews = reviewDocument.Reviews.filter(item => item.user_id.toString()!== userId);
    await reviewDocument.save();

    product.totalrating = reviewDocument.totalrating;
    await product.save();

    
    user.products.push({
      product: productId,
      actions:'delete review',
    });
    await user.save();
    res.status(204).send(reviewDocument);

  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;
