import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/repositories",
            name: "repositories",
            component: () => import("./components/RepositoriesList")
        },
        {
            path: "/repositories/:id",
            name: "repository-details",
            component: () => import("./components/Repository")
        },
        {
            path: "/",
            alias: "/add",
            name: "add",
            component: () => import("./components/AddRepository")
        }
    ]
})