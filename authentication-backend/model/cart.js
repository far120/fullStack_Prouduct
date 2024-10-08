const mongoose = require('mongoose');

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Minimum quantity of 1
    default: 1 
  },
  price: {
    type: Number,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, 
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Main Cart Schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [cartItemSchema], // Array of cart items
  totalPrice: {
    type: Number,
    default: 0, // Automatically calculate total price
  },
  isActive: {
    type: Boolean,
    default: true, // Indicates if the cart is active
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update totalPrice and updatedAt before saving
cartSchema.pre('save', function (next) {
    
    this.totalPrice = this.items.reduce((total, item) => {
        const discountedPrice = item.discount > 0 
            ? item.price * (1 - item.discount / 100) 
            : item.price;
    
        return total + (item.quantity * discountedPrice);
    }, 0);
    
  this.updatedAt = Date.now();
  next();
});

// Cart Model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
