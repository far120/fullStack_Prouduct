const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const joi = require('joi');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

router.post('/:userid', upload.single('image'), async (req, res) => {
  const admin = req.params.userid;

  const schema = joi.object({
    title: joi.string().required().min(3).max(500),
    description: joi.string().required().min(10),
    price: joi.number().required(),
    discount: joi.number().required().min(0).max(100),
    stock: joi.number().required().min(1),
    category: joi.string().required(),
    subcategory: joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findById(admin);
    if (!user || user.role !== 'admin') {
      return res.status(403).send('Access denied. Only admin can create products.');
    }

    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      stock: req.body.stock,
      image: req.file.path, // Store the Cloudinary URL
      category: req.body.category,
      subcategory: req.body.subcategory,
      user_id: user._id,
    });

    await product.save();
    user.products.push({ product: product._id, actions: 'add' });
    await user.save();
    
    res.send(product);

  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
