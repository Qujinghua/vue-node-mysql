<template>
  <div>
    <div class="container-crumb">
      <span>{{ breadCrumbOne }}</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{ breadCrumbTwo }}</span>
    </div>
    <router-view/>
  </div>
</template>
<script>
// import sideBar from "./sidebar/index.vue"
// import container from "./container/index.vue"
export default {
  data () {
    return {
      breadCrumbA: '',
      breadCrumbB: '',
    }
  },
  components: {
    // sideBar,
    // container
  },
  watch: {

  },
  computed: {
    breadCrumbOne () {
      return this.$store.state.breadCrumbOne
    },
    breadCrumbTwo () {
      return this.$store.state.breadCrumbTwo
    }
  },
  methods: {

  }
}
</script>

