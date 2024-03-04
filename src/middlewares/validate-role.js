export const haveRol = (req, res, next) =>{
    if(!req.user) {
        return res.status(500).json({
            msg: "Invalid token"
        });
    }

    const {role, username} = req.user;

    if(role !== "Admin_role"){
        return res.status(401).json({
            msg: `The username ${userName} is not admin so he cant use an endpoint`
        });
    }
    next();
};