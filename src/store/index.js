import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    token: '',
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    initStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    deleteToken(state) {
      axios.defaults.headers.common["Authorization"] = ""
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
