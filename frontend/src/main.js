import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-icons.min.css'

createApp(App).use(store).mount('#app')
