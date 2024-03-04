import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const validateJWT = async (req = request, res = response, next) =>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "Missing token"
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if(!user) {
            return res.status(401).json({
                msg: "The user does not exist"
            });
        }
        if(!user.status){
            return res.status(401).json({
                msg: "Invalid token"
            });
        }
        req.user = user;
        next();
    } catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Invalid token"
        });
    }
};