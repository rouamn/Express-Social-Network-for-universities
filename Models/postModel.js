const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new mongoose.Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      description: { type: String, required: true },
      image: { type: String },
      video: { type: String },
      likes: [{ type: String }],
      comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    },
    { timestamps: true }
  );
  
  const Posts = mongoose.model("Posts", postSchema);
module.exports=Posts