import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import myPlugin from './plugin/myPlugin.js'
import store from './vuex'
import 'normalize.css'; 

createApp(App).use(router).use(myPlugin).use(store).mount('#app')
