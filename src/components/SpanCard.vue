<template>
  <el-row class="spanCard">
    <el-col class="label"
            v-bind:class="{ mark: required }"
            :span="6">
      {{`${label}：`}}
    </el-col>
    <!-- &nbsp;防止el-col里面的html为空不显示宽度 -->
    <el-col class="space"
            :span="4">&nbsp;</el-col>
    <el-col class="value"
            :span="14">
      {{value}}
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.spanCard {
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(115, 115, 115, 1);
  line-height: 25px;
  .label {
    text-align: right;
    white-space: nowrap;
    max-width: 90px;
  }
  .mark {
    &:after {
      display: inline-block;
      margin-left: -5px;
      content: "*";
      font-family: SimSun;
      line-height: 1;
      font-size: 14px;
      color: #5c95ff;
    }
  }
  .space {
    color: #5c95ff;
    padding-left: 5px;
    max-width: 50px;
  }
  // .value {
  //   white-space: nowrap;
  // }
}
</style>
