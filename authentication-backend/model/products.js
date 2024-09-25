const mongoose = require('mongoose');

const productsschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Products', productsschema);
