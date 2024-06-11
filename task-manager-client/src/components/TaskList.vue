<template>
  <div class="container mt-5">
    <h1 class="mb-4">Список завдань</h1>
    <!-- Фільтри -->
    <div class="mb-4">
      <div class="row">
        <div class="col-md-6">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Пошук за назвою"
            v-model="filters.title"
          >
        </div>
        <div class="col-md-6">
          <select 
            class="form-select" 
            v-model="filters.completed"
          >
            <option value="">Всі</option>
            <option value="true">Завершені</option>
            <option value="false">Не завершені</option>
          </select>
        </div>
      </div>
    </div>
    <!-- Список завдань -->
    <div class="list-group">
      <div 
        class="list-group-item" 
        v-for="task in filteredTasks" 
        :key="task._id"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ task.title }}</h5>
          <small>{{ task.completed ? 'Завершено' : 'Не завершено' }}</small>
        </div>
        <p class="mb-1">{{ task.description }}</p>
        <div>
          <button 
            class="btn btn-danger btn-sm me-2"
            @click="deleteTask(task._id)"
          >
            Видалити
          </button>
          <button 
            class="btn btn-success btn-sm me-2"
            @click="completeTask(task)"
            v-if="!task.completed"
          >
            Завершити
          </button>
          <button 
            class="btn btn-secondary btn-sm"
            @click="startEditing(task)"
          >
            Редагувати
          </button>
        </div>
        <div v-if="editingTask && editingTask._id === task._id">
          <form @submit.prevent="updateTask(task._id)">
            <div class="mb-3">
              <label for="editTitle" class="form-label">Назва</label>
              <input 
                type="text" 
                class="form-control" 
                id="editTitle" 
                v-model="editingTask.title"
              >
            </div>
            <div class="mb-3">
              <label for="editDescription" class="form-label">Опис</label>
              <input 
                type="text" 
                class="form-control" 
                id="editDescription" 
                v-model="editingTask.description"
              >
            </div>
            <button type="submit" class="btn btn-primary">Зберегти</button>
            <button 
              type="button" 
              class="btn btn-secondary" 
              @click="cancelEditing"
            >
              Скасувати
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      filters: {
        title: '',
        completed: '',
      },
      editingTask: null,
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        const matchesTitle = task.title.toLowerCase().includes(this.filters.title.toLowerCase());
        const matchesCompleted = this.filters.completed === '' || task.completed.toString() === this.filters.completed;
        return matchesTitle && matchesCompleted;
      });
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Помилка отримання завдань:', error);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        this.fetchTasks();
      } catch (error) {
        console.error('Помилка видалення завдання:', error);
      }
    },
    async completeTask(task) {
      try {
        await axios.patch(`http://localhost:3000/tasks/${task._id}`, { completed: true });
        this.fetchTasks();
      } catch (error) {
        console.error('Помилка оновлення завдання:', error);
      }
    },
    startEditing(task) {
      this.editingTask = { ...task };
    },
    cancelEditing() {
      this.editingTask = null;
    },
    async updateTask(id) {
      try {
        await axios.patch(`http://localhost:3000/tasks/${id}`, this.editingTask);
        this.fetchTasks();
        this.editingTask = null;
      } catch (error) {
        console.error('Помилка оновлення завдання:', error);
      }
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
