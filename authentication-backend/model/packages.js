const { string, number } = require('joi');
const mongoose = require('mongoose');

const packagesschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 200
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    disprice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    reviwes:{
        type: [number],
        default: []
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    image: {
        type: [String],
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Products', productsschema);
