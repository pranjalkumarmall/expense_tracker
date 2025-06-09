import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // good practice to ensure unique emails
    },
    password: {
        type: String,
        required: true
    },
});

// Capitalized 'User' is standard convention
export const User = mongoose.model("User", userSchema);
