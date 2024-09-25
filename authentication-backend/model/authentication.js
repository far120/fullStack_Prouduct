// const { string } = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const authenticationscehme = new mongoose.Schema({

    name:{
        type:String,
        required:true,
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
    }
},
    {
        timestamps:true
    })

    // authenticationscehme.methods.genratetoken = function()
    // {
    //     return jwt.sign({_id: this._id , role:this.role  }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    // }

const Authentications = mongoose.model('Authentications', authenticationscehme);

module.exports = Authentications;