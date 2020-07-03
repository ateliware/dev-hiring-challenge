import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      message: '',
      color: ''
    },
    loading: false
  },
  mutations: {
    show_message(state, payload) {
      state.snackbar.message = payload.message
      state.snackbar.color = payload.color
    },
    start_loading(state, payload) {
      state.loading = payload
    },
    stop_loading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
  },
  getters: {
    loading: state => state.loading
  }
})
