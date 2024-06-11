const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

const tasksRouter = require('./routes/tasks');

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);

const mongoURI = 'mongodb://localhost:27017/taskmanager'; // Ваш рядок підключення

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Підключено до MongoDB');
}).catch((error) => {
  console.error('Помилка підключення до MongoDB:', error);
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
