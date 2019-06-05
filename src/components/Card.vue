<template>
  <el-card shadow="never"
           :body-style="bodyStyle">
    <div v-if="title"
         class="card-title">{{ title }}</div>
    <div v-if="subtitle"
         class="card-subtitle">{{ subtitle }}</div>
    <div class="card-content"
         :style="contentStyle">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    bodyStyle: {
      type: Object,
      default: function () {
        return { height: '472px', padding: '32px 28px' }
      }
    },
    contentStyle: {
      type: Object,
      default: function () {
        return { margin: '40px 25px 10px 25px' }
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  /deep/ .el-card__body {
    position: relative;
    box-sizing: border-box;
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 25px;
    color: rgba(115, 115, 115, 1);
    .card-title {
      position: absolute;
    }

    // .card-content {
    //   margin: 40px 25px 10px 25px;
    // }

    .card-subtitle {
      text-align: right;
    }
  }
}
</style>
