<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="600px">
    这是详情
  </el-dialog>
</template>
<script>
import axios from '../../../../axios'
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {}
  },
  data () {
    return {
      loading: false,
    }
  },
  watch: {
    visible (now) {
      
    }
  },
  computed: {
    title () {
      return '详情'
    },
  },
  mounted () {
    
  },
  methods: {
    closeModel () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>


