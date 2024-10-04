const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            default:1,
            min: 1,
        },
        total_price: {
            type: Number,
            required: true,
        }
    }],
}, { timestamps: true });

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;
