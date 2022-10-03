import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: '',
      username: ''
    },
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
        state.user.username = localStorage.getItem('username')
        state.user.id = localStorage.getItem('userid')
      } else {
        state.token = ''
        state.isAuthenticated = false
        state.user.username = ''
        state.user.id = ''
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    deleteToken(state) {
      state.token = ''
      state.isAuthenticated = false
      state.user.username = ''
      state.user.id = ''
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
