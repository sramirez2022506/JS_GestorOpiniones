import User from "../user/user.model.js";
import Post from "../post/post.model.js";
import Comment from "../comment/comment.model.js";
import Role from "../role/role.model.js";


export const validRole = async (role= "") =>{
    const existsRole = await Role.findOne({role});
    if(!existsRole){
        throw new Error(`The role ${email} doesnt exists`);
    }
};

export const existsEmail = async (email= "")=>{
    const existsEmail = await User.findOne({email});
    if(existsEmail){
        throw new Error(`The email ${email} alredy exists`);
    }
};

export const existsUserById = async (id= "")=>{
    const existsUser = await User.findOne({id});
    if(existsUser){
        throw new Error(`The user id ${id} does not exists`);
    }
};

export const existsPostById = async (id= "")=>{
    const existsPost = await Post.findOne({id});
    if(existsPost){
        throw new Error(`The post id ${id} does not exist`);
    }
};

export const existsCommentById = async (id= "")=>{
    const existsComment = await Comment.findOne({id});
    if (existsComment){
        throw new Error(`The comment id ${id} does not exist`);
    }
};