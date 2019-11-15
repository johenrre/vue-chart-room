const express = require('express')
const app = express()

const server = app.listen(9000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
// 用户列表
var userList = []
// 引入 socket.io 模块 建立服务器
const io = require('socket.io').listen(server)
// 监听用户连接
io.on('connection', function (socket) {
  // console.log(io.sockets)
  console.log('新用户连接成功')
  // 用户登录 向客户端发送登录验证信息
  socket.emit('whoAreYou')
  // 接收客户端登录信息
  socket.on('name', function (name) {
    console.log(name)
    // 保存客户端信息
    userList.push(name)
    socket.name = name
    socket.broadcast.emit('message', `${socket.name} 加入房间`)
  })
  // 发送消息
  socket.emit('message', '你登录了')
  // 接收消息
  socket.on('message', function (msg) {
    console.log(`收到了：${msg}`)
    // io.sockets.emit('message', msg)
    var user = socket.name
    // 广播聊天消息
    // socket.emit('message', `${user}: ${msg}`);
    socket.broadcast.emit('message', `${user}: ${msg}`)
  })
  // 监听用户断开连接
  socket.on('disconnect', () => {
    console.log('有人离开了')
    // 更新在线用户列表
    userList.splice(userList.indexOf(socket.name), 1)
    // 广播客户端下线消息
    socket.broadcast.emit('message', `${socket.name} 已经离开`)
  })
})
