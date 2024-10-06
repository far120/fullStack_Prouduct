const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const  addproducts = (req , res , next)=>{
    const token = req.headers['authorization'];
    if (token) {
        try{
            const verified = jwt.verify(token ,process.env.TOKEN_SECRET );
            req.user = verified;
            if (req.user.role =="admin" || req.user.role== "adminserver") {
                console.log(token);
            next();
            } else {
                return res.status(403).json({ message: 'Access denied. You are not authorized to access this resource.' });
            }
        }
        catch(err){
            return res.status(401).json({ message: 'Token is not valid' });
        }

}
}

module.exports = addproducts;