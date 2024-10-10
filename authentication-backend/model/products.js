const mongoose = require('mongoose');
const Review = require('./reviwes');
const { types, ref } = require('joi');
const productSchema = new mongoose.Schema({
    user_id:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User'
        type:String,
        required: true
    },
   title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount:{
        type: Number,
        min: 0,
        max: 100
    },
    category: {
        type:String,
        required: true,
        // enum: ['electronics', 'clothes', 'books', 'health', 'beauty', 'grocery', 'fashion']
    },
    subcategory:{
        type:String,
        // required: true,
        // enum: ['man', 'woman', 'boy', 'girl', 'mobile', 'laptop', 'desktop', 'tv', 'Electrical appliances', 'refrigerator', 'fiction', 'non-fiction', 'educational', 'smart watch', 'camera', 'fruits', 'vegetables', 'dairy', 'snacks', 'frozen', 'speaker', 'clothing', 'shoes', 'food', 'vitamins', 'supplements', 'personal care', 'medical supplies', 'skincare', 'makeup', 'fragrances', 'haircare', 'footwear', 'accessories', 'jewelry', 'bags', 'hats', 'sunglasses', 'perfume', 'household item', 'toy', 'electronic accessory', 'book', 'author', 'publisher', 'genre', 'language', 'country', 'city', 'region', 'style', 'brand', 'color', 'material', 'pattern', 'size', 'age', 'gender', 'occupation', 'ethnicity', 'religion', 'political party', 'education', 'income', 'household size', 'pets', 'family member', 'family relationship', 'drink', 'season', 'month', 'day', 'time', 'weather', 'temperature', 'humidity']
    },
    image: {
        type: String,
        // required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 1
    },
    totalrating: {
        type: Number, // Changed to Number to store average rating
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
