import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
})

export default mongoose.model("user", userSchema)