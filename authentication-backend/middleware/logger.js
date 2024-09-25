const logger = (req , res , next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.get('host')}${req.url}`);
    next();
};
module.exports = logger