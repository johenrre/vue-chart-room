import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    name: '',
    message: []
  },
  mutations: {
    login (state, name) {
      state.isLogin = true
      state.name = name
    },
    message (state, msg) {
      console.log('debug', msg)
      state.message.push(msg)
    }
  }
})
