import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import axios from 'axios'
import ElementUI from 'element-ui'
import { post, get, patch, put } from './utils/http'

import CurrentUserService from './core/currentUser'
import 'normalize.css'
// cocketio
import VueSocketio from 'vue-socket.io'

Vue.prototype.$currentUser = CurrentUserService

// 配置的代理
Vue.prototype.HOST = '/api'
// 定义全局变量
Vue.prototype.$axios = axios
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.use(ElementUI, { zIndex: 3000 })

// const options = { path: '/chart-room/' }
Vue.use(
  new VueSocketio({
    debug: true,
    connection: 'localhost:9000'
  })
)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
