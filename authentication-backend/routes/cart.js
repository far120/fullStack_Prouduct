const express = require('express');
const joi = require('joi');
const User = require('../model/authentication');
const Product = require('../model/products'); 
const Cart = require('../model/cart'); 
const router = express.Router();


router.get('/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const user = await User.findById(userid);
        if (!user) return res.status(404).send('User not found');
        const cart = await Cart.findOne({ userId: userid });
        if (!cart) return res.status(404).send('Cart not found');
        res.send(cart);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/:userid/products/:productid', async (req, res) => {
  const { userid, productid } = req.params;

  
  const schema = joi.object({
    quantity: joi.number().min(1).default(1).optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const quantity = value.quantity || 1; 


    const user = await User.findById(userid);
    if (!user) return res.status(404).send('User not found');


    const product = await Product.findById(productid);
    if (!product) return res.status(404).send('Product not found');

    
    let cart = await Cart.findOne({ userId: userid });
    if (!cart) {
      cart = new Cart({ userId: userid, items: [] });
    }

    
    const existingItem = cart.items.find(item => item.productId.toString() === productid);

    if (existingItem) {
      existingItem.quantity += quantity; 
    } else {
      
      cart.items.push({ productId: productid, quantity, price: product.price , title: product.title , imageUrl:product.image , discount: product.discount }); // Use productid from params
    }

    await cart.save(); 
    user.products.push({
        product: productid,
        actions: 'add to cart',
    })
    await user.save();

    res.status(201).json(cart); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/:userid/products/:productid', async (req, res) => {
    const { userid, productid } = req.params;
    
    try {
        const user = await User.findById(userid);
        if (!user) return res.status(404).send('User not found');
        
        const cart = await Cart.findOne({ userId: userid });
        if (!cart) return res.status(404).send('Cart not found');

        cart.items = cart.items.filter(item => item.productId.toString() != productid);
        await cart.save();

        user.products.push({
            product: productid,
            actions: 'delete from cart',
        })
        await user.save();
        
        res.send(cart);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

router.put('/:userid/products/:productid', async (req, res) => {
    const { userid, productid } = req.params;
    const schema = joi.object({
        quantity: joi.number().min(1).default(1).optional(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const quantity = value.quantity || 1; 
        
    
        const user = await User.findById(userid);
        if (!user) return res.status(404).send('User not found');
        
      
        const product = await Product.findById(productid);
        if (!product) return res.status(404).send('Product not found');
        
     
        let cart = await Cart.findOne({ userId: userid });
        if (!cart) {
            cart = new Cart({ userId: userid, items: [] });
        }
        
        
        const existingItem = cart.items.find(item => item.productId.toString() === productid);
        
        if (existingItem) {
            existingItem.quantity = quantity; 
        } else {
            
            cart.items.push({ productId: productid, quantity, price: product.price, title: product.title, imageUrl: product.image ,discount:product.discount }); // Use productid from params
        }
        await cart.save(); 

        user.products.push({
            product: productid,
            actions: 'update cart',
        })
        await user.save();
        
        res.status(201).json(cart); 
        
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error', error });
    }
})

module.exports = router;
