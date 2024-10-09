const express = require('express')
const joi = require('joi');
const Product = require('../model/products');
// const { disconnect, models } = require('mongoose')
const addproducts = require('../middleware/addproducts');
const adminserver = require('../middleware/adminservervalidationtoken');
const User = require('../model/authentication');
const router = express.Router()


require('dotenv').config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
cloudinary.config({
  cloud_name: my_cloud_name,
  api_key: 123456789012345,
  api_secret:my_api_secret
});

// Configure multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'products', // The folder where images will be stored in Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'], // Allowable image formats
  },
});

const upload = multer({ storage });

/// multer
// const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // console.log(file)
//         cb(null, 'images/products')
//     },
//     filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+`.${ext}`
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
    
//   })
//   const fileFilter = (req, file, cb) => {
//     const typeoffile = file.mimetype.split('/')[0];
//     if (typeoffile!== 'image') {
//         return cb({ "status":httpresponse.errorCallback , "erorr":'Only images are allowed!'}, false);
//     }
//     cb(null, true);
//   }


  
//   const upload = multer({ 
//      storage ,
//      fileFilter
//    })


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
  // console.log(admin)
    const schema = joi.object({
    title : joi.string().required().min(3).max(500),
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

      // console.log(user)

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
console.log(product._id); 
user.products.push({
    product: product._id, 
    actions: 'add' 
});
await user.save();
res.send(product);

    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.put('/:id/:userid', addproducts, upload.single('image'), async (req, res) => {
    const admin = req.params.userid;
  
    // Joi schema for validation
    const schema = joi.object({
      title: joi.string().min(3).max(500).required(),
      description: joi.string().min(10).required(),
      price: joi.number().required(),
      discount: joi.number().min(0).max(100),
      stock: joi.number().min(1).required(),
      category: joi.string().required(),
      subcategory: joi.string().required(),
  });
  
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    try {
      // Check if user is an admin
      const user = await User.findById(admin);
      if (!user) return res.status(403).send('Access denied. Only admin can update products.');
  
      // Find the product to update
      let product = await Product.findById(req.params.id);
      if (!product) return res.status(404).send('Product not found');
  
 
      // Update the product
     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        stock: req.body.stock,
        image: req.file ? req.file.filename : product.image, // Keep existing image if none uploaded
        category: req.body.category,
        subcategory: req.body.subcategory,
      }, { new: true });
    
      user.products.push({
        product: updatedProduct._id,
        actions: 'update',
    });
    await user.save();
      // Return the updated product
      res.send(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  router.delete('/:id/:userid', addproducts, async (req, res) => {
    const admin = req.params.userid;
    try {
    
      const user = await User.findById(admin);
      if (!user) return res.status(403).send('Access denied. Only admin can delete products.');
        
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).send('Product not found');

        user.products.push({
            product: deletedProduct._id,
            actions: 'delete'
        });
        await user.save();

        res.send(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});




module.exports = router;

