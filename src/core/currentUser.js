import router from '@/router'
import { post, get } from '../utils/http'
import store from '@/store'

/* eslint-disable camelcase */
class CurrentUserService {
  constructor () {
    this._payload = this.get_token()
    // 这里去判断token有几种情况  1. 过期  2. 没有
    this.valid = this.init(this._payload)

    if (!this.valid) this.clear_token()
  }

  init (payload) {
    // 这里简单判断是否存在
    // 这里去判断token有几种情况  1. 过期  2. 没有
    return !!payload
  }

  login (info) {
    const params = {
      account: info.username,
      password: info.password
    }
    return post('/login', params).then(res => {
      if (res.code === '200') {
        this.save_token(res.data)
        this.valid = true
        this.redirect_homePage()
      }
      return res
    })
    // 发送请求验证登录信息
    // 成功返回token
    //   -解析token
    // 错误返回错误信息
  }

  getInfo () {
    return get('/person/userDetail').then(res => {
      const code = res.code
      if (code === '200') {
        store.commit('set_userInfo', res.data)
      }
    })
  }

  logout () {
    this.valid = false
    this.clear_token()
    this.redirect_loginPage()
  }

  redirect_homePage () {
    router.push('/')
  }

  redirect_loginPage () {
    router.push({ name: 'login' })
  }

  get_token () {
    return localStorage.getItem('token')
  }

  save_token (token) {
    localStorage.setItem('token', token)
  }

  clear_token () {
    localStorage.removeItem('token')
  }
}

export default new CurrentUserService()
