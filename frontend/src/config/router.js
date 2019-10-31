import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home.vue'
import Detalhes from '@/components/detalhes/Detalhes.vue'
import Favoritos from '@/components/favoritos/Favoritos.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/detalhes', name: 'detalhes', component: Detalhes },
    { path: '/favoritos', name: 'favoritos', component: Favoritos }
]

export default new VueRouter({
    routes,
    mode: 'history'
})
