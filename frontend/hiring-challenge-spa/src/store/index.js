import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      message: '',
      color: ''
    }
  },
  mutations: {
    show_message(state, payload) {
      state.snackbar.message = payload.message
      state.snackbar.color = payload.color
    }
  },
  actions: {
  }
})
