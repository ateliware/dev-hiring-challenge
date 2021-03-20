import Vue from 'vue'
import App from '../App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faStar)
library.add(faEye)
library.add(faExclamationCircle)
library.add(faCodeBranch)


Vue.component('font-awesome-icon', FontAwesomeIcon)

import store from '../store'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(App),
    store
  }).$mount()
  document.body.appendChild(app.$el)
})