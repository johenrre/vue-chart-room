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
      default: 'lineChart'
    },
    id: {
      type: String,
      default: 'idLineChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    },
    xAxisKey: {
      type: String,
      default: 'time'
    },
    yAxisKey: {
      type: String,
      default: 'value'
    },
    unit: {
      type: String,
      default: '辆'
    },
    chartData: {
      type: Array,
      default: function () {
        return []
      }
    },
    yAxisOption: {
      type: Object,
      default: function () {
        return {}
      }
    },
    gridOption: {
      type: Object,
      default: function () {
        return {}
      }
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
    dataTranslate (data) {
      const xAxisData = data[0].data.map(d => d[this.xAxisKey])
      const filterLineData = (lineData) => {
        return lineData.map(d => d[this.yAxisKey])
      }
      const seriesData = data.map(lineData => {
        return {
          name: lineData.legend,
          type: 'line',
          data: filterLineData(lineData.data)
        }
      })

      return {
        xAxisData,
        seriesData
      }
    },
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      const { xAxisData, seriesData } = this.dataTranslate(this.chartData)

      const isShowLegend = this.chartData.length > 1
      const colors = ['#3D90F7', '#55BFC0', '#2F49CC']

      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          // tooltip加单位并且显示dot
          formatter: (params) => {
            let relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              relVal += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value + this.unit
            }
            return relVal
          }
        },
        grid: {
          ...this.gridOption,
          left: '8%',
          right: '0%'
        },
        legend: {
          show: isShowLegend,
          data: ['当前车型售价', 'MSRP'],
          left: '7%',
          top: '25',
          itemWidth: 10,
          itemGap: 25,
          itemHeight: 10,
          textStyle: {
            color: 'rgba(115,115,115,1)'
          }
        },
        xAxis: {
          type: 'category',
          // 折线图两边不要留白
          // boundaryGap: false,
          axisTick: {
            alignWithLabel: true
          },
          data: xAxisData
        },
        yAxis: {
          ...this.yAxisOption,
          type: 'value',
          // min: 0,
          // max: 40000,
          axisLine: {
            lineStyle: {
              color: colors[2]
            },
            // 隐藏辅助线
            show: false
          },
          // 隐藏刻度线
          axisTick: {
            show: false
          },
          // 设置辅助线为虚线， 默认solid
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
          // 这个是y辅助线的单位
          // axisLabel: {
          //   // formatter: '{value} %',
          //   // 设置刻度标签的样式， 默认是跟数据的颜色一致
          //   color: function () {
          //     return '#000'
          //   }
          // }
        },
        series: seriesData
      }
      this.chart.setOption({ ...option })
    }
  }
}
</script>

<style lang="scss" scoped></style>
