// this function is called after installation
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
const logger = require('./middleware/logger');


// middleware
app.use(express.json());
app.use(cors());
app.use(logger);
app.use('/api/authentication', Authentications);
app.use('/uploads', express.static(path.join(__dirname,'uploads')))
app.all('*', (req, res) => {
    res.status(404).send({ status: "error",  msg: "Not Found" });
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
})

port = process.env.PORT || 2004 ;
app.listen(port, () => console.log(`Server running on port ${port}`));


