const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['electronics', 'clothes', 'books', 'health', 'beauty', 'grocery', 'fashion']  
    },
    subcategory:{ 
        type:[String],
        required: true,
        // enum: ['men' , 'women' , 'kids']
        // enum: ['mobile', 'laptop', 'desktop', 'television', 'washing machine', 'refrigerator', 'air conditioner', 'headphones', 'smartwatch', 'camera', 'speaker', 'clothing', 'shoes', 'food', 'household item', 'toy', 'electronic accessory', 'book', 'author', 'publisher', 'genre', 'language', 'country', 'city', 'region', 'style', 'brand', 'color', 'material', 'pattern', 'size', 'age', 'gender', 'occupation', 'ethnicity', 'religion', 'political party', 'education', 'occupation', 'income', 'household size', 'pets', 'family member', 'family relationship', 'food', 'drink', 'season', 'month', 'day', 'time', 'weather', 'temperature', 'humidity']
    },
    description: {
        type: String,
        maxlength: 200
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
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
