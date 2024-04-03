const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0 },
    video: String,
    tags: [String],
    likes: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
