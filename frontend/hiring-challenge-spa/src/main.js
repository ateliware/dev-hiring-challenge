import Vue from 'vue'
import axios from './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(axios)

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
