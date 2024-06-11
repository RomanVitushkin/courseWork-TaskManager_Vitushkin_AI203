<template>
  <div class="container mt-5">
    <h1 class="mb-4">Додати нове завдання</h1>
    <form @submit.prevent="addTask">
      <div class="mb-3">
        <label for="title" class="form-label">Назва</label>
        <input 
          type="text" 
          class="form-control" 
          id="title" 
          v-model="title" 
          required
        >
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Опис</label>
        <input 
          type="text" 
          class="form-control" 
          id="description" 
          v-model="description" 
          required
        >
      </div>
      <button type="submit" class="btn btn-primary">Додати завдання</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    async addTask() {
      try {
        await axios.post('/tasks', {
          title: this.title,
          description: this.description,
        });
        this.title = '';
        this.description = '';
        this.$router.push('/');
      } catch (error) {
        console.error('Помилка додавання завдання:', error);
      }
    },
  },
};
</script>
