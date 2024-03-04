import bcryptjs from "bcryptjs";
import Comment from "../comment/comment.js";
import post from "../post/post.model.js";
import User from "./user.model.js";

export const getUserById = async (req, res) =>{
    const id = req.user.id;
    const user = await User.findOne({_id: id});

    res.status(200).json({
        user
    });
};

export const updateProfile = async (req, res) =>{
    try {
        const {userId} = req.user.id;
        const {profileInfo} = req.body;

        if(!profileInfo || Object.keys(profileInfo).leght === 0){
            return res
            .status(400)
            .json({msg: "Profile info needs a request body"});
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {$set: {profileInfo}},
            {new: true}
        );

        res.json(updateUser);
    }catch(e){
        console.log(e);
        res.status(500).json({msg: "Error in the server"});
    }
};

export const register = async (req, res) =>{
    try{
        const {userName, email, password} = req.body;
        const hashPassword = await bcryptjs.hash(password, 10);
        const user = new User({
            userName,
            email,
            password: hashPassword
        });

        await user.save();

        res.status(201).json({msg: "User register"});
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Error in the server"
        });
    }
};

export const usernameUpdate = async (req, res) =>{
    try{
        const userId = req.user.id;
        const {actualPassword, newUserName} = req.body;

        const user = await User.findById(userId);

        const passwordCorrect = await bcryptjs.compare(
            actualPassword,
            user.password
        );
        if(!passwordCorrect) {
            return res.status(200).json({
                msg: "Incorrect password try again"
            });
        }

        user.userName = newUserName;
        await user.save();

        res.status(200).json({
            msg: "UserName updated"
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Error in the server"
        });
    }
};

export const passwordUpdate = async (req, res) =>{
    try{
        const userId = req.user.id;
        const {actualPassword, newPassword} = req.body;

        const user = await User.findById(userId);

        const passwordCorrect = await bcryptjs.compare(
            actualPassword,
            user.password
        );

        if(!passwordCorrect){
            return res.status(400).json({
                msg: "Incorrect password"
            });
        }

        const hashPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();

        res.json({
            msg: "Password updated"
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Error in the server"
        });
    }
};
