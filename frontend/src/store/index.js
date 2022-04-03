import { createStore } from "vuex";

const store = createStore({
    state:{
        repositories: []
    },
    getters:{
        getRepositories(state) {
            return state.repositories
        }
    },
    mutations:{
        SAVE_REPO(state, repositories) {
            state.repositories = repositories
        }
    },
    actions:{
        saveRepositories({commit}, repositories) {
            commit('SAVE_REPO', repositories)
        }
    },
})

export default store