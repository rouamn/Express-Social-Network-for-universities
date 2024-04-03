const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "password length should be greater than 5 characters"],},
        profession:{
            type: String,
            required: true,
        },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    location: { type: String },
    profileUrl: { type: String },
    views: [{ type: String }],
    verified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports=User
