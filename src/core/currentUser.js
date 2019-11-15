class CurrentUserService {
  constructor () {
    this.isLogin = false
    this.info = {}
  }

  login (name) {
    this.info.name = name
    this.isLogin = true
  }
}

export default new CurrentUserService()
