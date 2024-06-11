const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Отримання всіх завдань
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера при отриманні завдань' });
  }
});

// Створення нового завдання
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера при створенні завдання' });
  }
});

// Оновлення завдання
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Завдання не знайдено' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Помилка оновлення завдання:', error);
    res.status(500).json({ error: 'Помилка сервера при оновленні завдання' });
  }
});

// Видалення завдання
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Завдання видалено успішно' });
  } catch (error) {
    console.error('Помилка видалення завдання:', error);
    res.status(500).json({ error: 'Помилка сервера при видаленні завдання' });
  }
});

module.exports = router;
