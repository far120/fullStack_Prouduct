const rolevalid = (req , res , next) => {
    const { role } = req.body;
    if (req.body.email.includes("@admin."))
        req.body.role = "admin";
    else if (req.body.email.includes("@adminserver."))
        req.body.role = "adminserver";
    else
    req.body.role = "user";
    next();
};

module.exports = {rolevalid};