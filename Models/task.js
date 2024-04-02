const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['To_Do', 'IN_PROGRESS', 'DONE'],
    default: 'To_Do',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
