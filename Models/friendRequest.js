import mongoose from "mongoose";
import { Schema } from "mongoose";

const requestSchema = Schema(
    {
          requestTo: { type: Schema.Types.ObjectId, ref: "User"},
          requestFrom: { type: Schema.Types.ObjectId, ref: "User"},
          requestStatus: {type: String , default: "Pending"},


    }, 
    {timestamps: true}

    );
    const FriendRequest = mongoose.model("FriendRequest", requestSchema)
    export default FriendRequest;