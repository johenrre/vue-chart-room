const express = require('express')
const app = express()

const server = app.listen(9000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
// 用户列表
// var userList = []
const User = require('./userList')
// 引入 socket.io 模块 建立服务器
const io = require('socket.io').listen(server)
// 监听用户连接
io.on('connection', function (socket) {
  // console.log(io.sockets)
  console.log('新用户连接成功')
  // 用户登录 向客户端发送登录验证信息
  socket.emit('whoAreYou')
  // 接收客户端登录信息
  socket.on('login', function (form) {
    const name = form.name
    console.log('新用户登录：', name)
    // 保存客户端信息
    User.create(form)
    socket.name = name
    socket.broadcast.emit('announcement', `${socket.name} 加入房间`)
  })
  // 发送消息
  socket.emit('message', '你登录了')
  // 接收消息
  socket.on('message', function (msg) {
    console.log(`收到了${socket.name}：${msg}`)
    // 广播聊天消息
    const user = User.find(socket.name)
    socket.broadcast.emit('message', user, msg)
  })
  socket.on('image', function (imgData) {
    var user = socket.name
    // 通过一个newImg事件分发到除自己外的每个用户
    socket.broadcast.emit('image', user, imgData)
  })
  // 监听用户断开连接
  socket.on('disconnect', () => {
    console.log('有人离开了')
    // 更新在线用户列表
    User.remove(socket.name)
    // userList.splice(userList.indexOf(socket.name), 1)
    // 广播客户端下线消息
    socket.broadcast.emit('announcement', `${socket.name} 已经离开`)
  })
})
