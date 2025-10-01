// backend/controllers/taskController.js
import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js';

// Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, user: req.user._id });
  res.status(201).json(task);
});

// Get tasks 
export const getTasks = asyncHandler(async (req, res) => {
  const { q, completed } = req.query;
  const query = { user: req.user._id };
  if (q) query.$or = [{ title: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }];
  if (completed !== undefined) query.completed = completed === 'true';
  const tasks = await Task.find(query).sort({ createdAt: -1 });
  res.json(tasks);
});

// Get single task
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) { res.status(404); throw new Error('Task not found'); }
  res.json(task);
});

// Update task
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) { res.status(404); throw new Error('Task not found'); }
  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  const updated = await task.save();
  res.json(updated);
});

// Delete task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) { res.status(404); throw new Error('Task not found'); }
  res.json({ message: 'Task removed' });
});
