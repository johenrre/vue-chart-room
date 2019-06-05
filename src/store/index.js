import Vue from 'vue'
import Vuex from 'vuex'
// import logonStatus from './module/logonStatus'
// import permissionUsers from './module/permissionUsers'
// import permissionRole from './module/permissionRole'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      userName: ''
    }
  },
  mutations: {
    set_userInfo (state, info) {
      state.userInfo = { ...info }
    }
  }
  // modules: {
  //   logonStatus,
  //   permissionUsers,
  //   permissionRole
  // }
})
