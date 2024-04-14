import {createApp} from 'vue'
import { createDeviceDetector } from "next-vue-device-detector";

import Vue3Toastify from 'vue3-toastify';
import router from "./router/index.js";

import './style.css'
import './axios.js'
import App from './App.vue'
import Logger from "./components/Logger/index.vue";
export const device = createDeviceDetector()
createApp(App)
    .use(router)
    .use(device)
    .use(Vue3Toastify)
    .component('Logger', Logger)
    .mount('#app')
