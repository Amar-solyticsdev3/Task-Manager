const express = require('express');
const { protect, adminOnly } = require('../middlewares/auth');
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskCheckList,
} = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.get('/dashboard-data', protect, getDashboardData);
taskRouter.get('/user-dashboard-data', protect, getUserDashboardData);
taskRouter.get('/', protect, getTasks);
taskRouter.get('/:id', protect, getTasksById);
taskRouter.post('/', protect, adminOnly, createTask);
taskRouter.put('/:id', protect, updateTask);
taskRouter.delete('/:id', protect, adminOnly, deleteTask);
taskRouter.put('/:id/status', protect, updateTaskStatus);
taskRouter.put('/:id/todo', protect, updateTaskCheckList);

module.exports = taskRouter;
