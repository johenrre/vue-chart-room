<template>
  <div class="chart-room">
    <div ref="messages"
         class="chart-messages"
         v-viewer>
      <div class="message_box"
           v-for="(item, index) in messages"
           v-bind:key="index">
        <template v-if="item.type === 'announcement'">
          <div class="announcement"
               v-if="item.type === 'announcement'">
            {{item.message}}
          </div>
        </template>
        <template v-if="item.type !== 'announcement'">
          <div class="avatar"></div>
          <div class="content">
            <div class="name">{{item.name}}</div>
            <div class="message">
              <template v-if="item.type === 'message'">
                {{item.message}}
              </template>
              <template v-if="item.type === 'image'">
                <img :src="item.imageData"
                     style="max-width: 50%; cursor: zoom-in;"
                     alt="image">
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div>
      <el-button v-on:click="uploadImg">图片</el-button>
      <el-button>emoji</el-button>
      <!-- <label for="sendImage" class="imageLable">
          <input type="button" value="image"  />
          <input id="sendImage" type="file" value="image"/>
      </label> -->
      <el-button v-on:click="clear">clear</el-button>
    </div>
    <el-form :model="form"
             ref="form"
             :rules="rules"
             label-width="0px">
      <el-form-item prop="message">
        <el-input placeholder="请输入要发送的信息"
                  v-model="form.message"
                  type="textarea"
                  size="large"
                  suffix-icon="iconfont icon-yonghu">
        </el-input>
      </el-form-item>
      <div>
        <el-button type="primary"
                   @click="sendMessage('form')">发送信息</el-button>
      </div>
    </el-form>
    <input id="upload_img"
           type="file"
           style="display: none;"
           ref="upload_img"
           value="image" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        message: ''
      },
      rules: {
        message: [
          { required: true, message: '信息不能为空' }
        ]
      },
      messages: [{
        type: 'message',
        name: 'test',
        avatar: 1,
        message: 'f223r2'
      }]
    }
  },
  sockets: {
    message: function (response) {
      const [user, msg] = response
      this.messages.push({
        type: 'message',
        message: msg,
        ...user
      })

      this.$nextTick(() => {
        this.scroldown()
      })
    },
    image: function (response) {
      const [user, imageData] = response
      this.messages.push({
        type: 'image',
        imageData: imageData,
        ...user
      })

      this.$nextTick(() => {
        this.scroldown()
      })
    },
    announcement: function (msg) {
      this.messages.push({
        type: 'announcement',
        message: msg
      })

      this.$nextTick(() => {
        this.scroldown()
      })
    }
  },
  mounted () {
    this.$refs['upload_img'].addEventListener('change', this.sendImage)
  },
  methods: {
    sendMessage (formName) {
      const formRef = this.$refs[formName]
      formRef.validate(valid => {
        if (valid) {
          this.messages.push({
            type: 'message',
            message: this.form.message,
            ...this.$currentUser.info
          })
          this.$socket.emit('message', this.form.message)

          this.$nextTick(() => {
            this.scroldown()
          })
          formRef.resetFields()
        }
      })
    },
    pushMessage (msg, selfMessage = false) {
      const m = {
        message: `${selfMessage ? '我: ' : ''}${msg}`,
        type: 'message'
      }
      this.messages.push(m)
    },
    clear () {
      this.messages = []
    },
    uploadImg () {
      this.$refs['upload_img'].click()
    },
    sendImage () {
      const files = this.$refs['upload_img'].files
      if (files.length !== 0) {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = e => {
          const imgData = e.target.result
          this.$socket.emit('image', imgData)
          this.messages.push({
            type: 'image',
            imageData: imgData,
            ...this.$currentUser.info
          })
        }
        reader.readAsDataURL(file)
      }
    },
    // 聊天窗口滑动到底部
    scroldown () {
      const el = this.$refs['messages']
      el.scrollTop = el.scrollHeight - el.clientHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-room {
  width: 100%;
  height: 85%;
  .chart-messages {
    width: 100%;
    height: 80%;
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: scroll;
    box-sizing: border-box;
    .message_box {
      position: relative;
      margin: 10px;
      .avatar {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 30px;
        height: 30px;
      }
      .content {
        margin-left: 30px;
      }
    }
  }
}
</style>
