import * as Mutation from './mutation-types'

import axios from 'axios'

export default {
  getLanguages({ commit }) {
    axios.get(`/languages.json`)
        .then(response => {
            if(response.data.length > 0){
              commit(Mutation.SET_LANGUAGE_TO_LIST, response.data[0])
            }
            return commit(Mutation.SET_LANGUAGES, response.data)
        })    
  },
  getRepositories({ commit }){
    return new Promise((resolve, reject) => {
      axios.get(`/repositories.json`)
        .then(response => {
          commit(Mutation.SET_REPOSITORIES, response.data)
          resolve(response)
        })
        .catch(error => reject(error))
    }) 
  },
  setLanguageToList({ commit }, language) {
    return commit(Mutation.SET_LANGUAGE_TO_LIST, language)
  }
}