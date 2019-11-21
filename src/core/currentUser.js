class CurrentUserService {
  constructor () {
    this.isLogin = false
    this.info = {}
  }

  login (params) {
    this.info = { ...params }
    this.isLogin = true
  }
}

export default new CurrentUserService()
