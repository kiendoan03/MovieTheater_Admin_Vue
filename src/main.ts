import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/js/bootstrap.bundle'
const app = createApp(App)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')