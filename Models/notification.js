const mongoose = require("mongoose");

const { Schema } = mongoose;

const noticeSchema = new Schema(
    {
        team: [{ type: Schema.Types.ObjectId, ref: "User" }],
        text: { type: String },
        task: { type: Schema.Types.ObjectId, ref: "Task" },
        notiType: { type: String, default: "alert", enum: ["alert", "message"] },
        isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
