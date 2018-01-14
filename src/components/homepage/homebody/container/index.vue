<template>
  <div class="container">
    <user-manage v-if="nowMenu=='5-1'"></user-manage>
    <department-manage v-else-if="nowMenu=='5-2'"></department-manage>
    <div>{{nowMenu}}</div>
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
    }
  },
  components: {
    userManage,
    departmentManage
  }
}
</script>
<style lang="sass" scoped>

</style>



