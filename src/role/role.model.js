import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    role: {
        type: string,
        required: [true, "The role is obligatory"]
    },
});

export default mongoose.model("Role", RoleSchema);