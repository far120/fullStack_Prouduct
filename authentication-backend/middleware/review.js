const jwt = require('jsonwebtoken');
const express = require('express');
const dotenv = require('dotenv');
const Review = require('../model/reviwes'); // Ensure the correct spelling of 'reviews'

dotenv.config();

const router = express.Router();

// Middleware for validating reviews
const validationReview = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified; // Attach the verified user info to the request object

        // Find the review by ID
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).send('Review not found.');
        }

        // Check if the user ID from the token matches the review's user ID
        if (review.user_id.toString() === req.user._id) {
            next(); // User is authorized to access the resource
        } else {
            return res.status(403).send('Access denied. You are not authorized to access this resource.');
        }
    } catch (err) {
        return res.status(400).send('Invalid token.');
    }
};
module.exports = {validationReview};
