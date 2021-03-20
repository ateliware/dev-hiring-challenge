import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import actions from './actions'
import mutations from './mutations'

const state = {
    languageToList: null,
    languages: [],
    repositories: [],
}

const getters = {
    LANGUAGES: state => {
        return state.languages
    },
    REPOSITORIES: state => {
        let repositories =  state.repositories

        if(state.languageToList){
            repositories = state.repositories.filter((repository) => {return repository.language_id == state.languageToList.id})
        }

        return repositories
    },
    LANGUAGE_TO_LIST: state => {
        return state.languageToList
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})