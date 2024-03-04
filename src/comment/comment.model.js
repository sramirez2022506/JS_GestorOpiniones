import mongoose from "mongoose";

const {Schema} = mongoose;

const CommentSchema = mongoose.Schema({
    authorU: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The author is obligatory"]
    },

    post: {
        type: Schema.Types.objectId,
        ref: "User",
        required: [true, "The post must be writed"]
    },

    content: {
        type: string,
        required: [true, "The content is obligatory"]
    },

    status: {
        type: Boolean,
        default: true
    },

    createdWhen:{
        type: Date,
        default: Date.now,
    },

    updatedWhen:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Comment", CommentSchema);