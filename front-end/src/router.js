import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./view/repositorio/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    redirect: "/repositorios"
  },
  {
    path: "/repositorios",
    name: "Repositorios",
    component: Index
  },
];

const router = new VueRouter({
  routes
});

export default router;
