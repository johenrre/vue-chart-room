<template>
  <div class="login-box">
    <div class="login-form">
      <el-form :model="loginForm"
               :rules="rules"
               ref="loginForm"
               label-width="0px"
               class="ms-content">
        <el-form-item prop="username">
          <el-input placeholder="请输入您的名字"
                    v-model="loginForm.username"
                    size="large"
                    suffix-icon="iconfont icon-yonghu">
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary"
                     :loading="loginOff"
                     @click="submitForm('loginForm')">{{ loginTxt }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loginOff: false,
      loginTxt: '登录',
      loginForm: {
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const name = this.loginForm.username
          const params = {
            name,
            avatartId: Math.floor(Math.random() * 9)
          }
          this.$socket.emit('login', params)
          this.$currentUser.login(name)
          this.$router.push({ path: '/chartRoom' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  position: relative;
  // background: url("../../assets/imgs/bg.png") no-repeat center center;
  // background-size: 100% 100%;
  .login-form {
    padding: 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    .ms-content {
      padding: 30px 0;
      .el-input {
        width: 300px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #484848;
      }
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 30px;
    }
    .login-btn {
      width: 100%;
      .el-button {
        width: 100%;
        height: 40px;
        background: rgba(68, 82, 213, 1);
        border-radius: 4px;
        font-size: 16px;
      }
    }
  }
}
</style>
