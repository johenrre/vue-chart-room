<template>
  <div>
    <h1>首页</h1>
    <el-button v-on:click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {}
  },
  methods: {
    login () {
      console.log('login')
    }
  }
}
</script>

<style lang="scss" scoped></style>
