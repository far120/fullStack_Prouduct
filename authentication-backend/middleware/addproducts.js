const jwt = require('jsonwebtoken');

const  addproducts = (req , res , next)=>{
    const token = req.headers['authorization'];
    if (token) {
        try{
            const verified = jwt.verify(token , "secret");
            req.user = verified;
            if (req.user.role =="admin" || req.user.role== "adminserver") {
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