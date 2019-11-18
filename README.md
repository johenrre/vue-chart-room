# chart-room

## 安装以来
```sh
npm install
```

### 运行
```sh
npm start
```

### 运行服务器
```sh
npm run server
```

### 打包
```sh
npm run build
```

### vue-socket.io

```js
// 安装
npm install vue-socket.io --save

// 在main文件配置
import VueSocketio from 'vue-socket.io'

Vue.use(
  new VueSocketio({
    debug: true,
    connection: 'localhost:9000'
  })
)

// 在vue实例中的使用

// 发送数据
this.$socket.emit('message', m)  // message是服务端监听的事件
// 接收服务器数据
sockets: {
  message: function (msg) {				// message是服务端触发的事件
    console.log('收到信息', msg)
  }
},

// 注意防坑
// 在服务器执行下面代码， 广播信息时候，当前socket是收不到信息的
socket.on('message', function(msg) {
  console.log(`收到了：${msg}`);
  // io.sockets.emit('message', msg)
  var user = socket.name;
  // 广播聊天消息
  // socket.emit('message', `${user}: ${msg}`);
  socket.broadcast.emit('message', `${user}: ${msg}`);
});

```



### todo

- [ ] 头像功能
- [ ]  添加表情包
- [ ] 发送图片功能
- [ ] 显示在线用户列表
- [ ] docker打包
  - [ ] vue的自动build
  - [ ] nginx代理
  - [ ] docker运行服务器
  - [ ] 使用docker-compose一键部署

