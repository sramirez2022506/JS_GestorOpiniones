import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName: {
        type: string,
        required: [true, "The username is obligatory"],
        unique: true
    },

    email: {
        type: string,
        required: [true, "The email is obligatory"],
        unique: true
    },

    password: {
        type: string,
        required: [true, "The password is obligatory"]
    },

    status: {
        type: Boolean,
        default: true
    },

    role: {
        type: string,
        required: true,
        enum: ["User:role", "Admin_role"],
        default: "User_role"
    },

    profileInfo: {
        name: {
            type: string
        },
        avatarURL: {
            type: string
        },
        bio: {
            type: string
        },
    },

    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        },
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
});

UserSchema.methods.toJSON = function () {
    const {__v, password, _id, ...user} = this.toObject();
    return user;
};

export default mongoose.model("User", UserSchema);