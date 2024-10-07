const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const authenticationscehme = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:50,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user', 'admin' , 'adminserver']
        
    },
    token:{
        type:String
    },
    avatar:{
        type:String,
        default: "uploads/download.png"
  
    },
    // products: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product'
    // }]
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            actions: {
                type: String,
                enum: ['add', 'update', 'delete' , 'add to wishlist', 'delete from wishlist'],
                required: true
            }
        }
    ]
},
    {
        timestamps:true
    })



const Authentications = mongoose.model('Authentications', authenticationscehme);

module.exports = Authentications;