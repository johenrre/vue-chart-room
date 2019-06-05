# chart-room

## 安装以来
```sh
npm install
```

### 运行
```sh
npm start
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
this.$socket.emit('message', m)  // message是服务端监听的事件
```

