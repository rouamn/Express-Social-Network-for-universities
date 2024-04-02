const express = require('express');
const {
  createTask,
  getTasksByUserId,
  getTasksByStatus,
  getAllTasks,
  updateTaskStatus,
  deleteTask,
} = require('../Controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/:userId', getTasksByUserId);
router.get('/status/:status/:userId', getTasksByStatus);
router.put('/:taskId/:status', updateTaskStatus);
router.get('/', getAllTasks);
router.delete('/:id', deleteTask);
module.exports = router;
