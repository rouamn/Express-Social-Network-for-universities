const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailVerificationSchema = new Schema({
    userId: String,
    token: String,
    createdAt: Date,
    expiresAt: Date,
});

const Verification = mongoose.model("Verification", emailVerificationSchema);
module.exports = Verification;