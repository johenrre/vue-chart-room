<template>
  <div>
    <h1>首页</h1>
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
      }
    }
  },
  sockets: {
    message: function (msg) {
      console.log('收到信息', msg)
    }
  },
  methods: {
    sendMessage (formName) {
      const formRef = this.$refs[formName]
      formRef.validate(valid => {
        if (valid) {
          const m = this.form.message
          formRef.resetFields()
          this.$socket.emit('message', m)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
