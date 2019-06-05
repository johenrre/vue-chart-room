<template>
  <div :id="id"
       :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { random } from 'lodash'

export default {
  // 参考 https://gallery.echartsjs.com/editor.html?c=multiple-y-axis
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
    },
    chartData: {
      type: Array,
      default: function () {
        return []
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
    renderData () {
      // console.log('test22', this.chartData)
      // const legendData = []
      // const seriesData = []
      // this.chartData.forEach(value => {
      //   legendData.push(value.name)
      //   seriesData.push(value)
      // })
    },
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      // console.log('initChart', this.chart)
      var colors = ['#3D90F7', '#55BFC0', '#2F49CC']
      const units = [
        { name: '细分市场销量', unit: '辆' },
        { name: '当前车型销量', unit: '辆' },
        { name: '占有率', unit: '%' }
      ]
      // this.renderData()

      const options = {
        color: colors,

        tooltip: {
          trigger: 'axis',
          // axisPointer: { type: 'cross' }
          // tooltip加单位并且显示dot
          formatter: function (params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              const unit = units.filter(u => u.name === params[i].seriesName)[0].unit
              relVal += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value + unit
            }
            return relVal
          }
        },
        grid: {
          right: '7%',
          left: '8%'
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          data: ['细分市场销量', '当前车型销量', '占有率'],
          left: '7%',
          top: '25',
          itemWidth: 10,
          itemGap: 25,
          itemHeight: 10,
          textStyle: {
            color: 'rgba(115,115,115,1)'
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['2016Q3', '2016Q4', '2017Q1', '2017Q2', '2017Q3', '2017Q4', '2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2']
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '温度',
            min: 0,
            max: 40000,
            position: 'left',
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
            },
            axisLabel: {
              // formatter: '{value} 辆',
              // 设置刻度标签的样式， 默认是跟数据的颜色一致
              color: function () {
                return '#000'
              }
            }
          },
          {
            type: 'value',
            // name: '蒸发量',
            min: 0,
            max: 100,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
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
              show: false,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLabel: {
              formatter: '{value} %',
              // 设置刻度标签的样式， 默认是跟数据的颜色一致
              color: function () {
                return '#000'
              }
            }
          }
        ],
        series: [
          {
            name: '细分市场销量',
            type: 'bar',
            // 不同series之间的间隙
            barGap: '0',
            // 最大宽度
            barMaxWidth: '16',
            data: [...Array(12)].map(() => random(10000, 30000))
          },
          {
            name: '当前车型销量',
            type: 'bar',
            barGap: '0',
            barMaxWidth: '16',
            data: [...Array(12)].map(() => random(10000, 30000))
          },
          {
            name: '占有率',
            type: 'line',
            yAxisIndex: 1,
            data: [...Array(12)].map(() => random(50, 80))
          }
        ]
      }
      this.chart.setOption({ ...options })
    }
  }
}
</script>

<style lang="scss" scoped></style>
