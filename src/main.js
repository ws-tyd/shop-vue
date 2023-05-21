import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from "./config/request";
import {ElMessage} from 'element-plus'
import router from "./router/index";
import store from './store/index'

const app = createApp(App)

app.provide('$message', ElMessage)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.config.globalProperties.axios = axios
app.mount('#app')