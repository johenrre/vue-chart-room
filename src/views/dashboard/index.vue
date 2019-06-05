<template>
  <div class="chart-room">
    <el-card ref="messages"
             class="chart-messages">
      <el-card v-for="(item, index) in messages"
               v-bind:key="index">{{item.message}}</el-card>
    </el-card>
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
          { required: true, message: '信息不能为空', trigger: 'blur' }
        ]
      },
      messages: []
    }
  },
  sockets: {
    message: function (msg) {
      // console.log('收到信息', msg)
      this.pushMessage(msg)
    }
  },
  mounted () {

  },
  methods: {
    sendMessage (formName) {
      const formRef = this.$refs[formName]
      formRef.validate(valid => {
        if (valid) {
          const m = this.form.message
          formRef.resetFields()
          this.pushMessage(m, 'right', true)
          this.$socket.emit('message', m)
        }
      })
    },
    pushMessage (msg, position = 'left', self = false) {
      const m = {
        message: `${self ? '我: ' : ''}${msg}`,
        position
      }
      this.messages.push(m)
      this.$nextTick(() => {
        console.log('dosome')
        this.scroldown()
      })
    },
    // 聊天窗口滑动到底部
    scroldown () {
      const el = this.$refs['messages'].$el
      el.scrollTop = el.scrollHeight - el.clientHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-room {
  width: 100%;
  height: 100%;
  .chart-messages {
    width: 100%;
    height: 50%;
    overflow: scroll;
    box-sizing: border-box;
  }
}
</style>
