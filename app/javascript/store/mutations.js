import * as Mutation from './mutation-types'

export default {
  [Mutation.SET_LANGUAGES] (state, languages) {
    return state.languages = languages
  },
  [Mutation.SET_LANGUAGE_TO_LIST] (state, language) {
    return state.languageToList = language
  },
  [Mutation.SET_REPOSITORIES] (state, repositories) {
    return state.repositories = repositories
  }
}