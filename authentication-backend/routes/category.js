const express = require('express');
const Joi = require('joi');
const Category = require('../model/category'); 
const router = express.Router();

router.get('/', async function(req, res){
    try{
        const categories = await Category.find();
        res.send(categories);
    }
    catch(err){
        res.status(500).send('Server error');
    }
})

router.get('/:id', async function(req, res){
    try{
        const category = await Category.findById(req.params.id);
        if(!category) return res.status(404).send('Category not found');
        res.send(category);
    }
    catch(err){
        res.status(500).send('Server error');
    }
})

router.post('/', async function(req, res){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(5).max(200).required(),
        subcategory: Joi.array().items(Joi.string()).required(),
    });
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            subcategory: req.body.subcategory
        });
        const result = await category.save();
        res.send(result);

    }
    catch(err){
        res.status(500).send('Server error');
    }
})

router.put('/:id', async function(req, res){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        description: Joi.string().min(5).max(200),
        subcategory: Joi.array().items(Joi.string()),
    });
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!category) return res.status(404).send('Category not found');
        res.send(category);
    }
    catch(err){
        res.status(500).send('Server error');
    }
 
});

router.delete('/:id', async function(req, res){
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category) return res.status(404).send('Category not found');
        res.send(category);
    }
    catch(err){
        res.status(500).send('Server error');
    }
});

module.exports = router;


