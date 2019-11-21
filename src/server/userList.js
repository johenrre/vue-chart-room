const userList = []

class User {
  constructor (form = {}) {
    this.name = form.name || ''
    this.avatar = form.avatar || ''
  }

  save () {
    userList.push(this)
  }

  static create (form = {}) {
    const u = new this(form)
    u.save()
    return u
  }

  static remove (name) {
    const index = userList.findIndex(e => e.name === name)
    userList.splice(index, 1)
  }

  static find (name) {
    const index = userList.findIndex(e => e.name === name)
    return userList[index] || null
  }
}

module.exports = User
