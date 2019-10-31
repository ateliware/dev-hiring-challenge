import Vue from 'vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import 'font-awesome/css/font-awesome.css'
import router from './config/router'
import './config/msgs'
//import axios from 'axios'
//const { authSecret } = require('../.env')

Vue.config.productionTip = false

/* axios.interceptors.request.use(
    async config => {
        config.headers.api_key = authSecret
        return config
    },
    error => {
        // I cand handle a request with errors here
        return Promise.reject(error)
    }
) */

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
