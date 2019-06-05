<template>
  <div class="component-popoverBtn">
    <el-popover placement="top"
                width="160"
                v-model="visible">
      <p>{{ content }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini"
                   type="text"
                   @click="onCancel">取消</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="onSure">确定</el-button>
      </div>
      <el-button size="mini"
                 slot="reference"
                 :type="btnType">{{btnName}}</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      default: '删除'
    },
    btnType: {
      type: String,
      default: 'danger'
    },
    param: {
      type: Object,
      default: function () {
        return {}
      }
    },
    content: {
      type: String,
      default: '确定删除嘛？'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onSure () {
      this.visible = false
      this.$emit('onSure')
    },
    onCancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.component-popoverBtn {
  display: inline-block;
}
</style>
