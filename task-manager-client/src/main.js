// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);

// Налаштування базової URL для axios
axios.defaults.baseURL = 'http://localhost:3000/api';

app.use(router);
app.mount('#app');
