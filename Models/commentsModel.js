const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Posts" },
    comment: { type: String, required: true },
    from: { type: String, required: true }, //name 
    replies: [
        {
            rid: { type: mongoose.Schema.Types.ObjectId },
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            from: { type: String }, //nom replier
            replayAt: { type: String }, //nom user
            comment: { type: String },
            created_At: { type: Date, default: Date.now() },
            updated_At: { type: Date, default: Date.now() },
            likes: [{ type: String }],
        },
    ],
    likes: [{ type: String }],
}, { timestamps: true });

const Comments = mongoose.model("Comments", commentSchema);
module.exports=Comments;