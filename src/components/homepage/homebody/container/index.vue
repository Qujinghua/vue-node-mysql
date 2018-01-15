<template>
  <div class="container">
    <div class="container-crumb">
      <span>{{ breadCrumbOne }}</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{ breadCrumbTwo }}</span>
    </div>
    <user-manage v-if="nowMenu=='5-1'"></user-manage>
    <department-manage v-else-if="nowMenu=='5-2'"></department-manage>
  </div>
</template>
<script>
import userManage from './userManage/index'
import departmentManage from './departmentManage/index'
export default {
  data () {
    return {

    }
  },
  computed: {
    nowMenu () {
      return this.$store.state.nowMenu
    },
    breadCrumbOne () {
      return this.$store.state.breadCrumbOne
    },
    breadCrumbTwo () {
      return this.$store.state.breadCrumbTwo
    },
  },
  components: {
    userManage,
    departmentManage
  }
}
</script>
<style lang="scss" scoped>
.container {
  float: left;
  padding: 20px;
  &-crumb{
    margin-bottom:  10px;
  }
}
</style>



