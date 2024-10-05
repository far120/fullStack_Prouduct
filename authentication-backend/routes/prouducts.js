const express = require('express')
const joi = require('joi');
const Product = require('../model/products');
// const { disconnect, models } = require('mongoose')
const addproducts = require('../middleware/addproducts');
const adminserver = require('../middleware/adminservervalidationtoken');
const User = require('../model/authentication');
const router = express.Router()



/// multer
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        cb(null, 'images/products')
    },
    filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+`.${ext}`
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
    
  })
  const fileFilter = (req, file, cb) => {
    const typeoffile = file.mimetype.split('/')[0];
    if (typeoffile!== 'image') {
        return cb({ "status":httpresponse.errorCallback , "erorr":'Only images are allowed!'}, false);
    }
    cb(null, true);
  }


  
  const upload = multer({ 
     storage ,
     fileFilter
   })
router.get('/' , async (req, res) => {
    try {
        const products = await Product.find().select('-__v');
        res.send(products);
        
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
      
        const product = await Product.findById(req.params.id).select('-__v');
        if (!product) return res.status(404).send('Product not found');
        res.send(product);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/:userid', addproducts , upload.single('image'), async (req, res) => {
  const admin = req.params.userid;
  console.log(admin)
    const schema = joi.object({
    title : joi.string().required().min(3).max(50),
    description : joi.string().required().min(10),
    price : joi.number().required(),
    discount : joi.number().required().min(0).max(100),
    stock : joi.number().required().min(1),
    // image : joi.string(),
    category: joi.string().required(),
    subcategory: joi.string().required(),
});

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


  
    try {
      // Validate user as admin
      const user = await User.findById(admin);
      if (!user ) return res.status(403).send('Access denied. Only admin can create products.');

      console.log(user)

      const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        stock: req.body.stock,
        image: req.file ? req.file.filename : null, 
        category: req.body.category, 
        subcategory: req.body.subcategory, 
        user_id: user._id, 
      });
      await product.save();
      res.send(product);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

router.put('/:id/:userid', addproducts , upload.single('image'), async (req, res) => {
  const admin = req.params.userid;
    const schema = joi.object({
    title : joi.string().min(3).max(50),
    description : joi.string().min(10),
    price : joi.number(),
    discount : joi.number().min(0).max(100),
    stock : joi.number().min(1),
    image : joi.string(),
    category: joi.string(),
    subcategory: joi.string(),
});

const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{

       const user = await User.findById(admin);
       if (!user ) return res.status(403).send('Access denied. Only admin can update products.');

       req.body.user_id = user._id;
       
        let product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!product) return res.status(404).send('Product not found');
        
        if(req.body.image) product.image = req.file.filename;
        await product.save();
        res.send(product);
    }
    catch(err) {
        res.status(500).send('Server error');
    }

});

router.delete('/:id', addproducts , async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.send(product);
    } catch (error) {
        res.status(500).send('Server error');
    }
});



module.exports = router;

