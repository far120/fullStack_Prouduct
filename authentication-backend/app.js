// this function is called after installation
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');




// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));



// instantiate express instance
const app = express();

// routes
const Authentications = require('./routes/authentication');
const Category = require('./routes/category');
const Products = require('./routes/prouducts');
const reviewRouter = require('./routes/reviwes');
const wishlist = require('./routes/wishlist');
const cart = require('./routes/cart');
const logger = require('./middleware/logger');


// middleware
app.use(express.json());
app.use(cors());  // for react api
app.use(compression()); // for compressed responses and requests
app.use(logger);
app.use('/api/authentication', Authentications);
app.use('/api/category', Category );
app.use('/api/products' , Products);
app.use('/images/uploads', express.static(path.join(__dirname,'images/uploads')))
app.use('/images/products', express.static(path.join(__dirname,'images/products')))
app.use('/api/review', reviewRouter);
app.use('/api/wishlist', wishlist);
app.use('/api/cart', cart);
app.all('*', (req, res) => {
    res.status(404).send({ status: "error",  msg: "Not Found" });
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
})

port = process.env.PORT || 2004 ;
app.listen(port, () => console.log(`Server running on port ${port}`));


