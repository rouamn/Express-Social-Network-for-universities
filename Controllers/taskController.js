const Task = require('../Models/task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTasksByUserId = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getTasksByStatus = async (req, res) => {
  const { status, userId } = req.params;
  try {
    const tasks = await Task.find({ type: status, createdBy: userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { type: status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.deleteOne({ _id: taskId });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
