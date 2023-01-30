import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar, faSpinner, faScaleBalanced, faHouse, faCode } from '@fortawesome/free-solid-svg-icons'

library.add(faStar)
library.add(faSpinner)
library.add(faScaleBalanced)
library.add(faHouse)
library.add(faCode)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(VueAxios, axios)

app.mount('#app')
