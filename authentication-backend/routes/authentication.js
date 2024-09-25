const express = require('express')
const asynchandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Authentications = require('../model/authentication')
const Joi = require('joi')
const {rolevalid } = require('../middleware/rolevalid');
const {validationtoken , adminserver} = require('../middleware/adminservervalidationtoken');

const routes = express.Router();

routes.get('/', adminserver ,async (req, res) => {
    try {
        const authentications = await Authentications.find().select("-password");
        res.json(authentications);
        
    } catch (error) {
        res.status(404).send(error.message);
    }
})



routes.get('/:id', validationtoken , async (req, res) => {
    try {
        const authentication = await Authentications.findById(req.params.id).select("-password");
        if (!authentication) return res.status(404).send("Not Found");
        res.json(authentication._doc);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

 routes.post('/', rolevalid ,async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50).trim(),
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().min(8).max(16).trim(), 
        role: Joi.string(),
    })
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await Authentications.findOne({ email: req.body.email})
    if(user) return res.status(400).send("User already exists");

    
    const newauthentication = new Authentications({
        name: req.body.name,
        email: req.body.email,
        // password: bcrypt.hashSync(req.body.password, 16),
        password : req.body.password,
        role:req.body.role,
    })
    try {
        console.log(req.body);
       const authentication = await newauthentication.save();
        const token = jwt.sign({_id: authentication._id , role:authentication.role  }, process.env.TOKEN_SECRET, { expiresIn: '2m' });
        authentication.token = token;
        await authentication.save();
        // const token = newauthentication.genratetoken();
        const { password , ...other} = authentication._doc;
        res.send({...other })
        // res.send({...other , token})

    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

routes.put('/:id', validationtoken , async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).trim(),
        email: Joi.string().email().trim(),
        password: Joi.string().min(8).max(16).trim(),
        role: Joi.string(),
    })
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // if(req.body.password){
    //     const salt = await bcrypt.genSalt(17);
    //     req.body.password = await bcrypt.hash(req.body.password ,salt)
    //     }

    const authentication = await Authentications.findByIdAndUpdate(req.params.id, 
          {
            name: req.body.name,
            email: req.body.email,
            // password: bcrypt.hashSync(req.body.password, 16),
            // password: req.body.password ? bcrypt.hashSync(req.body.password, 16) : authentication.password,
            password: req.body.password,
            role: req.body.role,
          },
        {new: true}
        )
        
        try {
    if(!authentication) return res.status(404).send("Not Found"); 
    res.json(authentication);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

routes.delete('/:id', adminserver , async (req, res) => {
    try {
    const authentication = await Authentications.findByIdAndDelete(req.params.id);
    if(!authentication) return res.status(404).send("Not Found"); 
    res.send(authentication);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

routes.post('/login', async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().min(8).max(16).trim(),
    })
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await Authentications.findOne({ email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    // const validPassword = bcrypt.compareSync(req.body.password, user.password);
    // if(!validPassword) return res.status(400).send("Invalid email or password");

    const validPassword = req.body.password === user.password || bcrypt.compareSync(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("Invalid email or password");

    const token = jwt.sign({_id: user._id , role:user.role  }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    user.token = token;
    await user.save();
    
    try{
        const { password,...other} = user._doc;
        res.send({...other})
    
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = routes;