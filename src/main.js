import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app');