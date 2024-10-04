const express = require('express');
const router = express.Router();
const Wishlist = require('../model/wishlist');
const Product = require('../model/products');
const User = require('../model/authentication'); 

// POST: Add a product to the wishlist
router.post('/:userId/products/:productId', async (req, res) => {
    const { userId, productId } = req.params;

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the wishlist already exists for the user
        let wishlist = await Wishlist.findOne({ user_id: userId });
        if (!wishlist) {
            wishlist = new Wishlist({ user_id: userId, products: [] });
        }

        // Check if the product is already in the wishlist
        if (wishlist.products.some(item => item.product_id.toString() === productId)) {
            return res.status(400).json({ message: 'Product is already in the wishlist' });
        }

        // Add the product to the wishlist
        wishlist.products.push({ product_id: productId });
        await wishlist.save();

        res.status(201).json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch the wishlist for a specific user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const wishlist = await Wishlist.findOne({ user_id: userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Remove a product from the wishlist
router.delete('/:userId/products/:productId', async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const wishlist = await Wishlist.findOne({ user_id: userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Filter out the product from the wishlist
        wishlist.products = wishlist.products.filter(item => item.product_id.toString() !== productId);
        await wishlist.save();

        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
