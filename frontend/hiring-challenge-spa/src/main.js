import Vue from 'vue'
import axios from './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(axios)

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
