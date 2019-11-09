import Vue from 'vue'
import Router from 'vue-router'
import Service from '@/components/Service'

Vue.use(Router);

const router = new Router({
  mode: 'history', // uris without hashes #, see https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode
  routes: [
    {path: '/', component: Service},
    // otherwise redirect to home
    {path: '*', redirect: '/'}
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
