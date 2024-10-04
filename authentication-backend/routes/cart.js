const express = require('express');
const router = express.Router();
const Cart = require('../model/cart');
const Product = require('../model/products');
const User = require('../model/authentication');
const joi = require('joi'); 

// @route GET api/cart

router.get('/:userid', async (req, res) => {
    
    try {
        const user = await User.findById(req.params.userid);
        if (!user) return res.status(404).send('User not found');
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/cart

router.post('/:userid/products/:productid', async (req, res) => {
    // Validate request body
    const schema = joi.object({
        quantity: joi.number().required().min(1)
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // Check if the user exists
        const user = await User.findById(req.params.userid);
        if (!user) return res.status(404).send('User not found');

        // Check if the product exists
        const product = await Product.findById(req.params.productid);
        if (!product) return res.status(404).send('Product not found');

        // Find or create a cart for the user
        let cart = await Cart.findOne({ user_id: req.params.userid });
        if (!cart) {
            cart = new Cart({ user_id: req.params.userid, products: [] });
        }

        // Check if the product is already in the cart
        if (cart.products.some(item => item.product_id.toString() === productId)) {
            return res.status(400).json({ message: 'Product is already in the cart' });
        }

        // Add product to the cart
        const newProduct = {
            product_id: req.params.productid,
            quantity: req.body.quantity
        };
        cart.products.push(newProduct);

        // Save the cart
        await cart.save();

        res.status(201).json(cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/cart/:userid/products/:productid

router.delete('/:userid/products/:productid', async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findById(req.params.userid);
        if (!user) return res.status(404).send('User not found');

        // Find or create a cart for the user
        let cart = await Cart.findOne({ user_id: req.params.userid });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        cart.products = cart.products.filter(product =>
            product.product_id.toString()!== req.params.productid
        );
        await cart.save();
        res.json(cart);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;