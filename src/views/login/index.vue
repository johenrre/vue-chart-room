<template>
  <div class="login-box">
    <div class="login-form">
      <p class="login-title">用户登录</p>
      <p class="login-en">USER LOGIN</p>
      <el-form :model="loginForm"
               :rules="rules"
               ref="loginForm"
               label-width="0px"
               class="ms-content">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名"
                    v-model="loginForm.username"
                    size="large"
                    suffix-icon="iconfont icon-yonghu"
                    @keyup.enter.native="submitForm('loginForm')">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="请输入密码"
                    v-model="loginForm.password"
                    suffix-icon="iconfont icon-mima"
                    @keyup.enter.native="submitForm('loginForm')"
                    size="large">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.savepwd">记住密码</el-checkbox>
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
        username: '',
        password: '',
        savepwd: true
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginOff = true
          this.loginTxt = '登录中...'
          this.$currentUser.login({ ...this.loginForm }).then(() => {
            this.loginOff = false
            this.loginTxt = '登录'
          })
        } else {
          this.$message({
            showClose: true,
            center: true,
            message: '请检查输入是否正确',
            type: 'error'
          })
          return false
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
  min-width: 1100px;
  min-height: 590px;
  background: url("../../assets/imgs/bg.png") no-repeat center center;
  background-size: 100% 100%;
  .login-form {
    padding: 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.8);
    position: fixed;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 4px;
    .login-title {
      margin: 0;
      font-size: 28px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: #4452d5;
      line-height: 40px;
    }
    .login-en {
      margin: 0;
      font-size: 18px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: #b0b0b0;
    }
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
