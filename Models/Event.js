const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema({
  createdBy: {type: Schema.Types.ObjectId, ref: "User" },
  title: {type: String, required: true, },
  description: { type: String, required: true, },
  date: {type: Date,required: true },
  location: { type: String,required: true},
  image: { type: String },
  tags: [String],
  likes: {  type: [String],  default: [], }, // Assuming likes are represented by strings
},
 { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;