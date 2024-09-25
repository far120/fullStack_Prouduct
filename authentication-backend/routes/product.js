const express = require('express')
const joi = require('joi');
const Products = require('../model/products');
const httpresponse = require('../httpresponse');

const routes = express.Router();

// GET /api/products

routes.get('/', async (req, res) => {
    try {
        const products = await Products.find().select('-__v');  
        res.status(200).send({ 
            "status": httpresponse.successCallback,
            "message": "Products fetched successfully",  
            "data": products
        });
    } catch (err) {
        return res.status(500).send({  
            "status": httpresponse.errorCallback,
            "message": err.message  
        });
    }
});

// GET /api/products/:id

routes.get('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).select('-__v');
        if(!product) return res.status(404).send({
            "status": httpresponse.failcallback,
            "message": "Product not found"
        });
        res.status(200).send({
              "status": httpresponse.successCallback,
               "message": "Product fetched successfully",
                "data": product
            });
    } catch (err) {
        return res.status(500).send({
          "status": httpresponse.errorCallback,
           "message": err.message
        });
    }
});

// POST /api/products

routes.post('/', async (req, res) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        price: joi.number().min(0).required(),
        quantity: joi.number().min(0).required(),
        description: joi.string().min(10).max(200).required(),
    })
    
    const { error } = schema.validate(req.body);
    
    if(error) return res.status(400).send({
          "status": httpresponse.errorCallback,
         "error": error.message
        });
    
    try{
        const newproduct = new Products({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
        })
        const products =  await newproduct.save();
        const {__v  ,...other} = products._doc;// disapper __v from
        res.status(200).send({
              "status": httpresponse.successCallback,
               "message": "Product created successfully",
                "data": other
            });
    }
    catch(err){
        return res.status(500).send({ 
             "status": httpresponse.errorCallback,
             "massage": err.massage
            });
    }
    })

    // PUT /api/products/:id
    
    routes.put('/:id', async (req, res) => {
        const schema = joi.object({
            name: joi.string().min(3).max(50).required(),
            price: joi.number().min(0).required(),
            quantity: joi.number().min(0).required(),
            description: joi.string().min(10).max(200).required(),
        })
        
        const { error } = schema.validate(req.body);
        
        if(error) return res.status(400).send({
              "status": httpresponse.errorCallback , 
              "error": error.message
            });
        
        try{
            const products =  await Products.findByIdAndUpdate(req.params.id,{
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                description: req.body.description,
            },
        {new : true}
        )
        
        if(products){
            const {__v  , ...other} = products._doc; // disapper __v from 
            res.status(201).send({ 
                 "status": httpresponse.successCallback  ,
                 "message": "Product created successfully",
                  "data": other
                });
        }
        else{
            return res.status(404).send({  
                "status": httpresponse.failcallback ,
                 "message": "Product not found"
                });
        }
    }
        catch(err){
            return res.status(500).send({
                  "status": httpresponse.errorCallback,
                 "massage": err.massage
                });
        }
        })

        // DELETE /api/products/:id
        
        routes.delete('/:id', async (req, res) => {
            try{
                const products =  await Products.findByIdAndDelete(req.params.id);
                if(products){
                    res.status(200).send({ 
                         "status": httpresponse.successCallback,
                         "message": "Product deleted successfully"
                        });
                }
                else{
                    return res.status(404).send({ 
                         "status": httpresponse.failCallback,
                         "message": "Product not found"
                        });
                }
            }
            catch(err){
                return res.status(500).send({ 
                      "status": httpresponse.errorCallback,
                     "massage": err.massage
                    });
            }
        })



module.exports = routes;
