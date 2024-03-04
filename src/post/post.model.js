import mongoose from "mongoose";

const {Schema} = mongoose;

const PostSchema = mongoose({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type:String,
        required: [true, "The title is obligatory"]
    },
    category: {
        type_String, 
        required: [true, "The category is obligatory"]
    },
    status: {
        type: Boolean,
        default: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    },
    createdWhen:{
        type: Date,
        default: Date.now
    },
});

export default mongoose.model("Post", PostSchema);