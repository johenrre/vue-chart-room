<template>
  <div :id="id"
       :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  // 参考
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'doubleBarChart'
    },
    id: {
      type: String,
      default: 'idDoubleBarChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      console.log('initChart', this.chart)
      // const option = {}
      // this.chart.setOption({ ...option })
    }
  }
}
</script>

<style lang="scss" scoped></style>
