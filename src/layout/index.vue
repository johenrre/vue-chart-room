<template>
  <div class="chart-box">
    <h1>rocking chart</h1>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.chart-box {
  margin: 0 auto;
  width: 800px;
  max-width: 90vw;
  height: 735px;
  max-height: 90vh;
}
</style>
